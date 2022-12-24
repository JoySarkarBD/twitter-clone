const getUsersHandler = require("../../controllers/user/getUsersHandler");
const htmlResponse = require("../../middlewares/common/html");
const loginChecker = require("../../middlewares/common/loginChecker");
require("dotenv").config();
/* dependencies */
const userRoute = require("express").Router();

/* get all user */
userRoute.get(
  "/",
  htmlResponse(`Users-${process.env.APP_NAME}`),
  loginChecker,
  getUsersHandler
);
module.exports = userRoute;
