/* dependencies */
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorhandler");
const authRoute = require("./routes/auth/authRoutes");

/* initialize app */
const app = express();
const port = process.env.PORT || 3000;
app.set("view engine", "pug");
dotenv.config();

/* add database */
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const { cookie } = require("express-validator");
const cookieParser = require("cookie-parser");
const homeRouter = require("./routes/home/homeRoute");
const tweetRoute = require("./routes/APIs/tweetPost");
const { redisClient } = require("./utilities/cacheManager");
const singlePost = require("./routes/APIs/singlePost");
const profileRoute = require("./routes/profile/profileRoute");
const searchRoute = require("./routes/search/searchRoute");
const userRoute = require("./routes/users/userRoute");
const httpSocketServer = require("./socket");

/* middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser(process.env.COOKIE_SECRETE));

/* route  start ================*/

/* auth route */
app.use(authRoute);

/* posts route */
app.use("/posts", tweetRoute);

/* profile route */
app.use("/profile", profileRoute);

/* search route */
app.use("/search", searchRoute);

/* get all users */
app.use("/users", userRoute);

/* single post route */
app.use("/", singlePost);

/* home route */
app.use("/", homeRouter);

/* route end====================== */

/* not found handler */
app.use(notFoundHandler);

/* error handler */
app.use(errorHandler);

/* app listening */
redisClient.connect();
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connected");

    // listening main app server
    app.listen(port, () => {
      console.log(`server is running @${port}`);
    });
    // listening socket server
    httpSocketServer.listen(3005, () => {
      console.log("Socket server is running @3005");
    });
  })
  .catch((err) => {
    console.log(err);
  });
