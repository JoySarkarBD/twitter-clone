const Tweet = require("../../models/Tweet");
const User = require("../../models/User");
const { updateCacheData } = require("../../utilities/cachedManagement");

const createNewTweet = async (req, res, next) => {
  try {
    const tweetObj = {
      content: req.body.content,
      images: [],
      tweetedBy: req.id,
      likes: [],
    };
    [...req.files].forEach((file) => {
      tweetObj.images.push(file.filename);
    });
    const tweet = Tweet(tweetObj);
    const result = await tweet.save();
    await User.populate(result, { path: "tweetedBy", select: "-password" });
    updateCacheData(`post:${result._id}`, result);
    return res.json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = createNewTweet;
