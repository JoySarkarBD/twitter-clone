const Tweet = require("../models/Tweet");
const User = require("../models/User");

const populator = async (data) => {
  await User.populate(data, { path: "tweetedBy", select: "-password" });
  await Tweet.populate(data, { path: "replyTo" });
  await Tweet.populate(data, {
    path: "replyTo.tweetedBy",
    select: "-password",
  });
};

module.exports = populator;
