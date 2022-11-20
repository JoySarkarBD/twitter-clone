const createNewTweet = require("../../controllers/APIS/createNewTweet.js");
const getAllPost = require("../../controllers/APIS/getAllPost.js");
const likeHandler = require("../../controllers/APIS/likeHandler.js");
const uploadTweetedImg = require("../../middlewares/APIS/uploadTweetedImg.js");
const loginChecker = require("../../middlewares/common/loginChecker.js");

const postRoute = require("express").Router();
require("dotenv").config();

// get Home page to post tweet
postRoute.post("/", loginChecker, uploadTweetedImg, createNewTweet);

// get all tweet after loading homepage
postRoute.get("/", loginChecker, getAllPost);

// put like on tweet
postRoute.put("/like/:id", loginChecker, likeHandler);

module.exports = postRoute;
