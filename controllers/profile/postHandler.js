/* dependencies */

const createHttpError = require("http-errors");
const User = require("../../models/auth/UserModel");
const Tweet = require("../../models/tweet/tweet");
const { cacheGetAndSet } = require("../../utilities/cacheManager");

/* home controller */

const postHandler = async (req, res) => {
  try {
    const username = req.params.username;

    const user = await cacheGetAndSet(`users:${req._id}`, async () => {
      const newUser = await User.findOne({ _id: req._id });
      return newUser;
    });

    /* find profile user */
    const profileUser = await User.findOne({ username });

    /* tweets counts */
    const totalTweetsCount = await Tweet.find({ tweetedBy: profileUser._id });

    const userJs = JSON.stringify(user);
    const profileUserStringData = JSON.stringify(profileUser);
    const tab = "posts";

    res.render("pages/profile/profile", {
      user,
      userJs,
      profileUser,
      profileUserStringData,
      tab,
      totalTweetsCount,
    });
  } catch (error) {
    throw createHttpError(500, error);
  }
};

/* export */
module.exports = postHandler;
