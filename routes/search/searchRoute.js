/* dependencies */

const searchTweetsHandler = require("../../controllers/search/searchTweetsHandler");
const searchUsersHandler = require("../../controllers/search/searchUsersHandler");
const htmlResponse = require("../../middlewares/common/html");
const loginChecker = require("../../middlewares/common/loginChecker");

const searchRoute = require("express").Router();
require("dotenv").config();

searchRoute.get(
  "/",
  htmlResponse(`Search-Page- ${process.env.APP_NAME}`),
  loginChecker,
  searchTweetsHandler
);

searchRoute.get(
  "/users",
  htmlResponse(`Search-Page- ${process.env.APP_NAME}`),
  loginChecker,
  searchUsersHandler
);

module.exports = searchRoute;
