/* dependencies */

const User = require("../../models/auth/UserModel");
const Tweet = require("../../models/tweet/tweet");
const { cacheGetAndSet } = require("../../utilities/cacheManager");

/* get all post function */

const getAllPost = async (req, res, next) => {
  try {
    /* login user */
    const user = await cacheGetAndSet(`users:${req._id}`, async () => {
      const newData = await User.findOne({ _id: req._id });
      return newData;
    });

    /* following user */
    const followingUsers = [...user.following, user._id] || [];

    // const filter post;

    const filter = {};

    /* get post only [tweeted and replies in profile path] */
    req.query.tweetedBy && (filter.tweetedBy = req.query.tweetedBy);
    req.query.replyTo &&
      (filter.replyTo =
        req.query.replyTo === "false"
          ? { $exists: "false" }
          : { $exists: true });

    /* get post only [following user and main] */
    req.query.followingOnly &&
      req.query.followingOnly === "true" &&
      (filter.tweetedBy = { $in: followingUsers });

    /* get pinned post */
    req.query.pinned && req.query.pinned === "true" && (filter.pinned = "true");

    /* get [search post] */
    if (req.query.searchText) {
      const content = req.query.searchText;
      filter.content = { $regex: new RegExp(content, "ig") };
    }

    const posts = await Tweet.find(filter);
    await User.populate(posts, { path: "tweetedBy", select: "-password" });
    await Tweet.populate(posts, { path: "postData" });
    await User.populate(posts, { path: "postData.tweetedBy" });
    await Tweet.populate(posts, { path: "replyTo" });
    await User.populate(posts, { path: "replyTo.tweetedBy" });

    return res.json(posts);
  } catch (error) {
    next(error);
  }
};

/* export func */
module.exports = getAllPost;
