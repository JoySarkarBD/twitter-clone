/* dependencies */

const User = require("../../models/auth/UserModel");
const Tweet = require("../../models/tweet/tweet");
const { cacheGetAndSet } = require("../../utilities/cacheManager");
const postPopulate = require("../../utilities/postPopulat");

/* SinglePostHandler */
async function SinglePostHandler(req, res, next) {
  try {
    const postId = req.params.id;
    const post = await cacheGetAndSet(`posts:${postId}`, async () => {
      const newdata = await Tweet.findById(postId);
      await postPopulate(newdata);
      return newdata;
    });

    return res.json(post);
  } catch (error) {
    next(error);
  }
}

/* export function */
module.exports = SinglePostHandler;
