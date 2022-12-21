/* dependencies */

const createHttpError = require("http-errors");
const User = require("../../models/auth/UserModel");
const { cacheGetAndSet } = require("../../utilities/cacheManager");

const followingHandler = async (req, res, next) => {
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

    res.render("pages/follow/follow", {
      user,
      userJs: JSON.stringify(user),
      profileUserStringData: JSON.stringify(profileUser),
      profileUser,
      tab: "following",
    });
  } catch (error) {
    console.log(error);
    next(createHttpError(500, "Internal Server Error"));
  }
};

module.exports = followingHandler;
