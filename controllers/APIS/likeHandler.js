const Tweet = require("../../models/Tweet");
const User = require("../../models/User");
const {
  getAndSetCachedData,
  updateCacheData,
} = require("../../utilities/cachedManagement");

const likeHandler = async (req, res, next) => {
  try {
    const postID = req.params.id;
    const userID = req.id;

    //update tweet like
    const user = await getAndSetCachedData(`user:${req.id}`, async () => {
      const newUser = await User.findOne({ _id: req.id });
      return newUser;
    });
    const isLiked = user.tweetsYouLike && user.tweetsYouLike.includes(postID);

    const putAndPullLikes = isLiked ? "$pull" : "$addToSet";

    const tweet = await Tweet.findByIdAndUpdate(
      { _id: postID },
      { [putAndPullLikes]: { likes: userID } },
      {
        new: true,
      }
    );

    // update data to cache
    updateCacheData(`tweets:${postID}`, tweet);

    //update user like
    const modifiedUserData = await User.findOneAndUpdate(
      { _id: userID },
      { [putAndPullLikes]: { tweetsYouLike: postID } },
      { new: true }
    );

    // update data to cache
    updateCacheData(`user:${userID}`, modifiedUserData);

    res.json(tweet);
  } catch (error) {
    next(error);
  }
};

module.exports = likeHandler;
