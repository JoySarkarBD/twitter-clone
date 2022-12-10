const createNewTweet = require("../../controllers/APIS/createNewTweet.js");
const deleteTweet = require("../../controllers/APIS/deleteTweet.js");
const getAllPost = require("../../controllers/APIS/getAllPost.js");
const getSingleTweet = require("../../controllers/APIS/getSingleTweet.js");
const likeHandler = require("../../controllers/APIS/likeHandler.js");
const replyHandler = require("../../controllers/APIS/replyHandler.js");
const retweetHandler = require("../../controllers/APIS/retweetHandler.js");
const singleTweet = require("../../controllers/singleTweet/singleTweet.js");
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

// put like on tweet
postRoute.post("/retweet/:id", loginChecker, retweetHandler);

// reply on tweet
postRoute.post("/reply/:id", loginChecker, uploadTweetedImg, replyHandler);

// get view single page
postRoute.get("/singleTweet/:id", loginChecker, singleTweet);

// get single tweet
postRoute.get("/getSingleTweet/:id", loginChecker, getSingleTweet);

// delete single tweet
postRoute.delete("/:id", loginChecker, deleteTweet);

module.exports = postRoute;
