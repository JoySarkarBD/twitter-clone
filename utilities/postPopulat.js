/* dependencies */

const User = require("../models/auth/UserModel");
const Tweet = require("../models/tweet/tweet");

async function postPopulate(post) {
  try {
    await User.populate(post, { path: "tweetedBy" });
    await Tweet.populate(post, { path: "replyTo" });
    await Tweet.populate(post, { path: "replyTo.tweetedBy" });
  } catch (error) {
    throw error;
  }
}

module.exports = postPopulate;
