// Dependencies
const profileRoute = require("express").Router();
const getProfileWithTweets = require("../../controllers/profile/getProfileWithTweets");
const getProfileWithReplies = require("../../controllers/profile/getProfileWithReplies");
const htmlResponse = require("../../middlewares/common/htmlResponse");
const loginChecker = require("../../middlewares/common/loginChecker");
require("dotenv").config();

// Get Profile Page with user's tweets
profileRoute.get(
  "/:userName",
  htmlResponse(`Home Page - ${process.env.APP_NAME}`),
  loginChecker,
  getProfileWithTweets
);
// Get Profile Page with user's replied tweets
profileRoute.get(
  "/:userName/replies",
  htmlResponse(`Home Page - ${process.env.APP_NAME}`),
  loginChecker,
  getProfileWithReplies
);

// Module Export
module.exports = profileRoute;
