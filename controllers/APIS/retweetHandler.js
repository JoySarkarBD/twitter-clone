const Tweet = require("../../models/Tweet");
const User = require("../../models/User");
const {
  getAndSetCachedData,
  updateCacheData,
} = require("../../utilities/cachedManagement");

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
    if (!retweetObj) {
      const tweet = Tweet({
        tweetedBy: userID,
        tweetData: postID,
      });
      retweetObj = tweet.save();
      updateCacheData(`retweet:${retweetObj._id}`, retweetObj);
    }

    const addAndRemoveRetweet = removeRetweet ? "$pull" : "$addToSet";

    // updating retweet users in db for this tweet
    const tweet = await Tweet.findByIdAndUpdate(
      { _id: postID },
      { [addAndRemoveRetweet]: { retweetedUsers: userID } },
      {
        new: true,
      }
    );

    // update tweets to cache
    updateCacheData(`tweets:${tweet._id}`, tweet);

    // update user retweet field in db
    const modifiedUserData = await User.findOneAndUpdate(
      { _id: userID },
      { [addAndRemoveRetweet]: { yourRetweets: postID } },
      { new: true }
    );

    // update user data to cache
    updateCacheData(`user:${userID}`, modifiedUserData);

    res.json(tweet);
  } catch (error) {
    next(error);
  }
};

module.exports = retweetHandler;
