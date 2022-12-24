const deletePost = require("../../controllers/APIs/deletePost");
const getAllPost = require("../../controllers/APIs/getAllPost");
const likePost = require("../../controllers/APIs/likePost");
const pinnedPostHandler = require("../../controllers/APIs/pinnedPostHandler");
const replyHandler = require("../../controllers/APIs/replyHandler");
const retweetHandler = require("../../controllers/APIs/retweetHandler");
const tweetPost = require("../../controllers/APIs/tweetPost");
const uploadTweetImage = require("../../middlewares/APIs/uploadTweetImage");
const loginChecker = require("../../middlewares/common/loginChecker");
require("dotenv").config();

/* dependencies */
const tweetRoute = require("express").Router();

/* create a post || tweet a post */
tweetRoute.post("/", loginChecker, uploadTweetImage, tweetPost);

/* get all post */
tweetRoute.get("/", loginChecker, getAllPost);

/* delete post */
tweetRoute.delete("/:id", loginChecker, deletePost);

/* like a post */
tweetRoute.put("/like/:id", loginChecker, likePost);

/* retweet || share a post */
tweetRoute.post("/retweet/:id", loginChecker, retweetHandler);

/* reply post */
tweetRoute.post("/reply/:id", loginChecker, uploadTweetImage, replyHandler);

/* pin || unpin post */
tweetRoute.put("/:id/pin", loginChecker, pinnedPostHandler);

module.exports = tweetRoute;
