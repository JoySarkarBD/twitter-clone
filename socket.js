const { Server } = require("socket.io");
const http = require("http");
const httpSocketServer = http.createServer();
const mongoose = require("mongoose");
const User = require("./models/auth/UserModel");
const { updateOrSetdata } = require("./utilities/cacheManager");

const io = new Server(httpSocketServer, {
  cors: ["http://localhost:3000/"],

  method: ["GET", "POST", "PUT", "DELETE", "PULL"],
});

/* established socket connection on server site */
io.on("connection", (socket) => {
  console.log("new user connected.");
  socket.on("setup", (user) => {
    /* connect a new socket user in a room by his[database._id] */
    const userId = user._id;
    socket.join(userId);
    socket.emit("connected");
    console.log(user.firstName + " " + user.lastName, " connected");
    // changing the active status in db(connected true)
    async function changeActiveUserStatus() {
      const result = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            activeStatus: true,
            lastSeen: new Date(),
          },
        },
        { new: true }
      );
      updateOrSetdata(`users:${result._id}`, result);
    }

    changeActiveUserStatus();
    /* disconnect a user */
    socket.on("disconnect", () => {
      setTimeout(async () => {
        const isActive = [...(await io.sockets.adapter.rooms.keys())].includes(
          userId
        );
        if (!isActive) {
          try {
            // changing the active status in db(connected false)
            async function changeActiveUserStatus() {
              const result = await User.findByIdAndUpdate(
                userId,
                {
                  $set: {
                    activeStatus: false,
                    lastSeen: new Date(),
                  },
                },
                { new: true }
              );
              updateOrSetdata(`users:${result._id}`, result);
            }
            changeActiveUserStatus();
            console.log(user.firstName + " " + user.lastName, " disconnected");
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log(`${user.firstName + " " + user.lastName} online now`);
        }
      }, 10000);
    });
  });
});

module.exports = httpSocketServer;
