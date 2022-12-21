const Tweet = require("../../models/tweet/tweet");
const { updateOrSetdata } = require("../../utilities/cacheManager");
const postPopulate = require("../../utilities/postPopulat");

const replyHandler = async (req, res, next) => {
  try {
    const user = req._id;
    const postId = req.params.id;
    const files = req.files;
    const replyObj = {
      content: req.body.content,
      tweetImages: [],
      tweetedBy: user,
      likes: [],
      retweetUsers: [],
      postData: null,
      replyTo: postId,
      replyPosts: [],
    };

    files.forEach(file => {
      replyObj.tweetImages.push(file.filename);
    });

    const postObj = await Tweet(replyObj).save();

    const mainUpdatedPost = await Tweet.findOneAndUpdate(
      { _id: postId },
      { $addToSet: { replyPosts: postObj._id } },
      { new: true }
    );

    /* populate post */
    await postPopulate(postObj);
    await postPopulate(mainUpdatedPost);
    /*set data on cache server */
    await updateOrSetdata(`posts:${postObj._id}`, postObj);
    await updateOrSetdata(`posts:${mainUpdatedPost._id}`, mainUpdatedPost);

    return res.json(postObj);
  } catch (error) {
    next(error);
  }
};

module.exports = replyHandler;
