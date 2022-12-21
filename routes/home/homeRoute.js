/* dependencies */
const homeController = require("../../controllers/home/getHome");
const htmlResponse = require("../../middlewares/common/html");
const loginChecker = require("../../middlewares/common/loginChecker");
require("dotenv").config();

//create router
const homeRouter = require("express").Router();

//get home route
homeRouter.get(
  "/",
  htmlResponse(`Home ${process.env.APP_NAME}`),
  loginChecker,
  homeController
);

/* export homeRoute */
module.exports = homeRouter;
