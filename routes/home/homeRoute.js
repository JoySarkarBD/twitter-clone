// Dependencies
const homeRoute = require("express").Router();
const getHomePage = require("../../controllers/home/getHomePage");
const htmlResponse = require("../../middlewares/common/htmlResponse");
const loginChecker = require("../../middlewares/common/loginChecker");
// const signInChecker = require('../../middlewares/common/signinChecker');
require("dotenv").config();

// Get Home Page
homeRoute.get(
  "/",
  htmlResponse(`Home Page - ${process.env.APP_NAME}`),
  loginChecker,
  getHomePage
);

// Module Export
module.exports = homeRoute;
