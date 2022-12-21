/* dependencies */

const User = require("../../models/auth/UserModel");
const Tweet = require("../../models/tweet/tweet");
const {
  updateOrSetdata,
  deleteCache,
} = require("../../utilities/cacheManager");
const postPopulate = require("../../utilities/postPopulat");

async function retweetHandler(req, res, next) {
  try {
    const userId = req._id;
    const postId = req.params.id;

    const deletedPost = await Tweet.findOneAndDelete({
      tweetedBy: userId,
      postData: postId,
    });

    /* create new twitted post */
    let data = deletedPost;
    if (data === null) {
      const tweet = new Tweet({
        tweetedBy: userId,
        postData: postId,
      });
      data = await tweet.save();
      await updateOrSetdata(`posts:${data._id}`, data);
    } else {
      /* delete cache  */
      deleteCache(`posts:${data._id}`);
    }

    const option = deletedPost !== null ? "$pull" : "$addToSet";

    /* update tweet Or post */
    const updatedPost = await Tweet.findOneAndUpdate(
      { _id: postId },
      { [option]: { retweetUsers: userId } },
      { new: true }
    );

    /* populate post */
    await postPopulate(updatedPost);
    //update post or tweet
    await updateOrSetdata(`posts:${updatedPost._id}`, updatedPost);

    /* update user */
    const modifiedUser = await User.findOneAndUpdate(
      { _id: userId },
      { [option]: { retweetPost: postId } },
      { new: true }
    );

    /* update user data  */
    await updateOrSetdata(`users:${modifiedUser._id}`, modifiedUser);

    // console.log(updatePost);
    return res.json(updatedPost);
  } catch (error) {
    next(error);
  }
}

/* export func */
module.exports = retweetHandler;
