/* dependencies */

const User = require("../../models/auth/UserModel");
const Tweet = require("../../models/tweet/tweet");
const { updateOrSetdata } = require("../../utilities/cacheManager");
const postPopulate = require("../../utilities/postPopulat");

/* create tweet a new post controller */
const tweetPost = async (req, res, next) => {
  try {
    const tweetObj = {
      content: req.body.content,
      tweetImages: [],
      tweetedBy: req._id,
      likes: [],
      retweetUsers: [],
      postData: null,
      replyPosts: [],
    };

    [...req.files].forEach(file => {
      tweetObj.tweetImages.push(file.filename);
    });

    const tweet = new Tweet(tweetObj);
    const result = await tweet.save();
    await postPopulate(result);
    updateOrSetdata(`posts:${result._id}`, result);
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

/* export func */
module.exports = tweetPost;
