const Tweet = require("../../models/Tweet");
const User = require("../../models/User");
const {
  getAndSetCachedData,
  updateCacheData,
} = require("../../utilities/cachedManagement");
const populator = require("../../utilities/populator");

const retweetHandler = async (req, res, next) => {
  try {
    const postID = req.params.id;
    const userID = req.id;

    const removeRetweet = await Tweet.findOneAndDelete({
      tweetedBy: userID,
      tweetData: postID,
    });

    let retweetObj = removeRetweet;

    // creating new tweet as retweet in db
    if (retweetObj === null) {
      const tweet = Tweet({
        tweetedBy: userID,
        tweetData: postID,
      });
      retweetObj = tweet.save();
      await updateCacheData(`tweet:${retweetObj._id}`, retweetObj);
    }

    const addAndRemoveRetweet = removeRetweet !== null ? "$pull" : "$addToSet";

    // updating retweet users in db for this tweet
    const tweet = await Tweet.findByIdAndUpdate(
      { _id: postID },
      { [addAndRemoveRetweet]: { retweetedUsers: userID } },
      {
        new: true,
      }
    );

    // update tweets to cache
    await populator(tweet);
    await updateCacheData(`tweet:${tweet._id}`, tweet);

    // update user retweet field in db
    const modifiedUserData = await User.findOneAndUpdate(
      { _id: userID },
      { [addAndRemoveRetweet]: { yourRetweets: postID } },
      { new: true }
    );

    // update user data to cache
    await updateCacheData(`user:${userID}`, modifiedUserData);

    res.json(tweet);
  } catch (error) {
    next(error);
  }
};

module.exports = retweetHandler;
