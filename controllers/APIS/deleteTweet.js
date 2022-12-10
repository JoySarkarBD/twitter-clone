/* dependencies */

const createHttpError = require("http-errors");
const User = require("../../models/User");
const Tweet = require("../../models/Tweet");
const {
  updateCacheData,
  getAndSetCachedData,
  deleteCache,
} = require("../../utilities/cachedManagement");
const populator = require("../../utilities/populator");

const deleteTweet = async (req, res, next) => {
  try {
    const postID = req.params.id;
    const userID = req._id;

    // delete a tweet
    const deletedTweet = await Tweet.findByIdAndRemove({
      _id: postID,
      tweetedBy: userID,
    });

    if (deletedTweet !== null) {
      await deleteCache(`tweet:${deletedTweet._id}`);
    } else {
      next(createHttpError(404, "Bad Request"));
    }
    // console.log(deletedTweet);

    // delete replied post
    if (deletedTweet?.replyTo) {
      const repliedTweet = await Tweet.findByIdAndUpdate(
        {
          _id: deletedTweet.replyTo,
        },
        { $pull: { repliedPost: postID } },
        { new: true }
      );
      if (repliedTweet !== null) {
        await populator(repliedTweet);
        updateCacheData(`tweet:${repliedTweet?._id}`, repliedTweet);
      }
    }

    // delete retweet user if tweetData exists in deleted tweet data
    if (deletedTweet?.tweetData) {
      const retweetedTweets = await Tweet.findByIdAndUpdate(
        { _id: deletedTweet?.tweetData },
        { $pull: { retweetedUsers: userID } },
        { new: true }
      );
      await populator(retweetedTweets);
      await updateCacheData(`tweet:${retweetedTweets._id}`, retweetedTweets);
    }

    // delete retweeted tweets data from user's retweeted array when the retweet post is deleted
    if (deletedTweet?.tweetData) {
      const user = await User.findByIdAndUpdate(
        { _id: deletedTweet.tweetedBy },
        { $pull: { yourRetweets: deletedTweet?.tweetData } },
        { new: true }
      );
      updateCacheData(`users:${user._id}`, user);
    }

    // delete retweeted tweets from user model
    if (deletedTweet?.retweetedUsers?.length) {
      deletedTweet?.retweetedUsers.forEach(async (userID) => {
        const retweetUser = await User.findByIdAndUpdate(
          { _id: userID },
          { $pull: { yourRetweets: deletedTweet._id } },
          { new: true }
        );
        await updateCacheData(`tweet:${retweetUser._id}`, retweetUser);
      });
    }

    // /* delete main tweets all retweeted tweets */(eta bujhi nai)
    if (deletedTweet?.retweetedUsers?.length) {
      deletedTweet?.retweetedUsers.forEach(async (userID) => {
        const deleteRetweetedTweets = await Tweet.findByIdAndDelete(
          {
            tweetData: deletedTweet._id,
            tweetedBy: userID,
          },
          { new: true }
        );
        await deleteCache(`tweet:${deleteRetweetedTweets._id}`);
      });
    }

    // delete "like" from deleted tweets and update user modal
    if (deletedTweet?.likes.length) {
      deletedTweet?.likes.forEach(async (userID) => {
        const user = await User.findByIdAndUpdate(
          { _id: userID },
          { $pull: { tweetsYouLike: deletedTweet._id } },
          { new: true }
        );
        await updateCacheData(`users:${user._id}`, user);
      });
    }

    res.json(deletedTweet);
  } catch (error) {
    throw error;
  }
};

module.exports = deleteTweet;
