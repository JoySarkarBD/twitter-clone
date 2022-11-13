const createNewTweet = require("../../controllers/APIS/createNewTweet.js");
const uploadTweetedImg = require("../../middlewares/APIS/uploadTweetedImg.js");
const loginChecker = require("../../middlewares/common/loginChecker.js");

const postRoute = require("express").Router();
require("dotenv").config();

postRoute.post("/", loginChecker, uploadTweetedImg, createNewTweet);

module.exports = postRoute;
