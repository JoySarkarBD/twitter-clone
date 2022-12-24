/* dependencies */

const createHttpError = require("http-errors");
const Tweet = require("../../models/tweet/tweet");
const {
  cacheGetAndSet,
  updateOrSetdata,
} = require("../../utilities/cacheManager");
const postPopulate = require("../../utilities/postPopulat");

const pinnedPostHandler = async (req, res, next) => {
  try {
    const userId = req._id;
    const postId = req.params.id;
    /* find post */
    let post = await cacheGetAndSet(`posts:${postId}`, async () => {
      const newData = await Tweet.find({ _id: postId });
      return newData;
    });

    if (post.pinned) {
      post = await Tweet.findOneAndUpdate(
        {
          _id: postId,
          tweetedBy: userId,
        },
        { $set: { pinned: false } },
        { new: true }
      );

      await postPopulate(post);
      await updateOrSetdata(`posts:${post._id}`, post);
    } else {
      const previousPinnedPost = await Tweet.findOneAndUpdate(
        {
          tweetedBy: userId,
          pinned: true,
        },
        { $set: { pinned: false } },
        { new: true }
      );

      if (previousPinnedPost) {
        await postPopulate(previousPinnedPost);
        await updateOrSetdata(
          `posts:${previousPinnedPost._id}`,
          previousPinnedPost
        );
      }

      post = await Tweet.findOneAndUpdate(
        { _id: postId, tweetedBy: userId },
        { $set: { pinned: true } },
        { new: true }
      );
      await postPopulate(post);
      await updateOrSetdata(`posts:${post._id}`, post);
    }

    res.json(post);
  } catch (error) {
    next(createHttpError(500, "Internal Server Error"));
  }
};

/* export function */

module.exports = pinnedPostHandler;
