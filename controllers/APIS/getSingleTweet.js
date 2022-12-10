const Tweet = require("../../models/Tweet");
const User = require("../../models/User");
const { getAndSetCachedData } = require("../../utilities/cachedManagement");
const tweetCacheUpdate = require("../../utilities/populator");

const getSingleTweet = async (req, res, next) => {
  try {
    const postID = req.params.id;
    const result = await getAndSetCachedData(`tweet:${postID}`, async () => {
      const newData = await Tweet.findById(postID);
      await tweetCacheUpdate(newData);
      return newData;
    });
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getSingleTweet;
