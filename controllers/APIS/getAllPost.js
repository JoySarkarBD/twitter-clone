const Tweet = require("../../models/Tweet");
const User = require("../../models/User");

const getAllPost = async (req, res, next) => {
  try {
    const result = await Tweet.find();
    await User.populate(result, { path: "tweetedBy", select: "-password" });
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllPost;
