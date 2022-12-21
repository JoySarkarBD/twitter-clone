/* dependencies */

const createHttpError = require("http-errors");
const User = require("../../models/auth/UserModel");
const Tweet = require("../../models/tweet/tweet");
const {
  deleteCache,
  updateOrSetdata,
} = require("../../utilities/cacheManager");
const postPopulate = require("../../utilities/postPopulat");

const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userId = req._id;

    /* delete a post */
    const deletedPost = await Tweet.findOneAndDelete({
      _id: postId,
      tweetedBy: userId,
    });
    if (deletedPost !== null) {
      await deleteCache(`posts:${deletedPost._id}`);
    } else {
      next(createHttpError(404, "Bad Request"));
    }

    /* delete replied post  */
    if (deletedPost?.replyTo) {
      const repliedPost = await Tweet.findOneAndUpdate(
        {
          _id: deletedPost.replyTo,
        },
        { $pull: { replyPosts: postId } },
        { new: true }
      );
      if (repliedPost !== null) {
        await postPopulate(repliedPost);
        updateOrSetdata(`posts:${repliedPost?._id}`, repliedPost);
      }
    }

    /* delete retweet user if postdata exists in deleted post data */
    if (deletedPost?.postData) {
      const retweetPost = await Tweet.findOneAndUpdate(
        { _id: deletedPost?.postData },
        { $pull: { retweetUsers: userId } },
        { new: true }
      );
      await postPopulate(retweetPost);
      await updateOrSetdata(`posts:${retweetPost._id}`, retweetPost);
    }

    /* delete retweet post data from user retweets array when the retweet post is deleted */
    if (deletedPost?.postData) {
      console.log(deletedPost?.postData);

      const user = await User.findOneAndUpdate(
        { _id: deletedPost.tweetedBy },
        { $pull: { retweetPost: deletedPost?.postData } },
        { new: true }
      );
      console.log(user);
      updateOrSetdata(`users:${user._id}`, user);
    }

    /* delete retweet post on user model */
    if (deletedPost?.retweetUsers.length) {
      deletedPost?.retweetUsers.forEach(async userId => {
        const retweetUser = await User.findOneAndUpdate(
          { _id: userId },
          { $pull: { retweetPost: deletedPost._id } },
          { new: true }
        );
        await updateOrSetdata(`posts:${retweetUser._id}`, retweetUser);
      });
    }

    /* delete all user on retweeted post */
    if (deletedPost?.retweetUsers.length) {
      deletedPost?.retweetUsers.forEach(async userId => {
        const deletedRetweetedpost = await Tweet.findOneAndDelete(
          {
            postData: deletedPost._id,
            tweetedBy: userId,
          },
          { new: true }
        );
        await deleteCache(`posts:${deletedRetweetedpost._id}`);
      });
    }

    /* delete "like" from deleted post and update user modal */
    if (deletedPost?.likes.length) {
      deletedPost?.likes.forEach(async userId => {
        const user = await User.findOneAndUpdate(
          { _id: userId },
          { $pull: { likes: deletedPost._id } },
          { new: true }
        );
        await updateOrSetdata(`users:${user._id}`, user);
      });
    }
    res.json(deletedPost);
  } catch (error) {
    throw error;
  }
};

module.exports = deletePost;
