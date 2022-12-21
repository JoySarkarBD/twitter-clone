/* dependencies */

const User = require("../../models/auth/UserModel");
const {
  cacheGetAndSet,
  updateOrSetdata,
} = require("../../utilities/cacheManager");

const followHandler = async (req, res, next) => {
  try {
    /* visited user */
    const profileId = req.params.id;

    /* logged in user */
    const loggedInUser = req._id;

    const followedUser = await cacheGetAndSet(
      `users:${profileId}`,
      async () => {
        const newData = await User.findOne({ _id: profileId });
        return newData;
      }
    );

    const isFollowed =
      followedUser.followers && followedUser.followers.includes(loggedInUser);

    /* query option */
    const option = isFollowed ? "$pull" : "$addToSet";

    /* set following user on my following lists */
    const modifiedLoggedInUser = await User.findOneAndUpdate(
      { _id: loggedInUser },
      { [option]: { following: profileId } },
      { new: true }
    );

    updateOrSetdata(`users:${modifiedLoggedInUser._id}`, modifiedLoggedInUser);

    /* set followers on following user */
    const modifiedFollowedUser = await User.findOneAndUpdate(
      { _id: profileId },
      { [option]: { followers: loggedInUser } },
      { new: true }
    );

    updateOrSetdata(`users:${modifiedFollowedUser._id}`, modifiedFollowedUser);

    res.json(modifiedFollowedUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = followHandler;
