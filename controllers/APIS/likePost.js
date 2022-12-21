/* dependencies */

const User = require("../../models/auth/UserModel");
const Tweet = require("../../models/tweet/tweet");
const {
  cacheGetAndSet,
  updateOrSetdata,
} = require("../../utilities/cacheManager");
const postPopulate = require("../../utilities/postPopulat");

const likePost = async (req, res, next) => {
  try {
    const userId = req._id;
    const postId = req.params.id;

    const user = await cacheGetAndSet(`users:${userId}`, async () => {
      const newData = User.findOne({ _id: userId });
      return newData;
    });

    const isLiked = user.likes && user.likes.includes(postId);
    const option = isLiked ? `$pull` : `$addToSet`;
    /* Update post Like */
    const post = await Tweet.findOneAndUpdate(
      { _id: postId },
      { [option]: { likes: userId } },
      { new: true }
    );

    //update post or tweet on cache memory
    await postPopulate(post);
    await updateOrSetdata(`posts:${postId}`, post);

    /* update user likes */
    const updateUser = await User.findOneAndUpdate(
      { _id: userId },
      { [option]: { likes: postId } },
      { new: true }
    );

    //update user after add or remove likes property stuff
    await updateOrSetdata(`users:${userId}`, updateUser);

    const data = { post, user: updateUser };
    res.json(data);
  } catch (error) {
    next(error);
  }
};

/* export function */

module.exports = likePost;
