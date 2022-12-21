const singlePost = require("express").Router();
const singlePageHandler = require("../../controllers/APIs/singlePageHandler");
const SinglePostHandler = require("../../controllers/APIs/SinglePostHandler");
const htmlResponse = require("../../middlewares/common/html");
const loginChecker = require("../../middlewares/common/loginChecker");
require("dotenv").config();

singlePost.get("/singlepage/:id", loginChecker, singlePageHandler);
singlePost.get("/singlepost/post/:id", loginChecker, SinglePostHandler);

module.exports = singlePost;
