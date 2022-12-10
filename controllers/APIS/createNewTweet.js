const Tweet = require("../../models/Tweet");
const User = require("../../models/User");
const { updateCacheData } = require("../../utilities/cachedManagement");
const populator = require("../../utilities/populator");

const createNewTweet = async (req, res, next) => {
  try {
    const tweetObj = {
      content: req.body.content,
      images: [],
      tweetedBy: req.id,
      likes: [],
      retweetedUsers: [],
      tweetData: null,
    };
    [...req.files].forEach((file) => {
      tweetObj.images.push(file.filename);
    });
    const tweet = Tweet(tweetObj);
    const result = await tweet.save();
    await populator(result);
    updateCacheData(`tweet:${result._id}`, result);
    return res.json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = createNewTweet;
