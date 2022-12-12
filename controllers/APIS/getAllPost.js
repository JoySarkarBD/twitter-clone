const Tweet = require("../../models/Tweet");
const User = require("../../models/User");

const getAllPost = async (req, res, next) => {
  try {
    const filterObj = {};
    req.query.tweetedBy && (filterObj.tweetedBy = req.query?.tweetedBy);

    req.query.replyTo &&
      (filterObj.replyTo =
        req.query?.replyTo == "false" ? { $exists: false } : { $exists: true });

    const result = await Tweet.find(filterObj);
    await User.populate(result, { path: "tweetedBy", select: "-password" });
    await Tweet.populate(result, { path: "tweetData" });
    await User.populate(result, {
      path: "tweetData.tweetedBy",
      select: "-password",
    });
    await Tweet.populate(result, { path: "replyTo" });
    await User.populate(result, { path: "replyTo.tweetedBy" });
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllPost;
