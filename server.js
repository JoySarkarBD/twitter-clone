// Dependencies
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth/authRoute");
const homeRoute = require("./routes/home/homeRoute");
const postRoute = require("./routes/APIS/getCreateNewTweetRoute");
const { redisClient } = require("./utilities/cachedManagement");
const profileRoute = require("./routes/profile/profileRoute");

// App Initialization and Config
const app = express();
dotenv.config();

// Express Settings
app.set("view engine", "pug");
app.set("views", "views");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser(process.env.COOKIE_SECRET));

// Routes
app.use(authRouter);

app.use("/posts", postRoute); //Post Route
app.use("/profile", profileRoute); //Profile Route
app.use("/", homeRoute); //Home Route

// Not Found Handler
app.use(notFoundHandler);

// Error Handler
app.use(errorHandler);

// Mongodb Connection
async function twitter() {
  try {
    await redisClient.connect();
    await mongoose.connect(process.env.DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("DB connected Successfully!!");
  } catch (error) {
    console.log(error);
  }
}

// Server Listen
app.listen(process.env.PORT || 3000, () => {
  twitter();
  console.log("Server connected on port" + " " + (process.env.PORT || 3000));
});
