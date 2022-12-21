/* dependencies */

const User = require("../../models/auth/UserModel");
const Tweet = require("../../models/tweet/tweet");

/* get all post function */

const getAllPost = async (req, res, next) => {
  try {
    // const filter post;

    const filter = {};
    req.query.tweetedBy && (filter.tweetedBy = req.query.tweetedBy);
    req.query.replyTo &&
      (filter.replyTo =
        req.query.replyTo === "false"
          ? { $exists: "false" }
          : { $exists: true });

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
