/* dependencies */

const createHttpError = require("http-errors");
const User = require("../../models/auth/UserModel");
const { cacheGetAndSet } = require("../../utilities/cacheManager");

const followersHandler = async (req, res, next) => {
  try {
    const profileUserName = req.params.username;
    const loggedUserId = req._id;

    /* loggedUser */
    const user = await cacheGetAndSet(`users:${loggedUserId}`, async () => {
      const newData = await User.findOne({ _id: loggedUserId });
      return newData;
    });

    /* profile user */
    const profileUser = await User.findOne({ username: profileUserName });
    await User.populate(profileUser, { path: "followers" });
    await User.populate(profileUser, { path: "following" });

    return res.render("pages/follow/follow", {
      user,
      userJs: JSON.stringify(user),
      profileUser,
      profileUserStringData: JSON.stringify(profileUser),
      tab: "followers",
    });
  } catch (error) {
    next(createHttpError(500, "Internal Server Error"));
  }
};

module.exports = followersHandler;
