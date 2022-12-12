// Dependencies
const createHttpError = require("http-errors");
const User = require("../../models/User");
const { getAndSetCachedData } = require("../../utilities/cachedManagement");

const getProfileWithReplies = async (req, res, next) => {
  try {
    const user = await getAndSetCachedData(`user:${req.id}`, async () => {
      const newUser = await User.findOne({ _id: req.id }, { password: 0 });
      return newUser;
    });
    const userProfile = await User.findOne(
      { userName: req.params.userName },
      { password: 0 }
    );
    const profileUserJs = JSON.stringify(userProfile);
    const userFrontEndData = JSON.stringify(user);

    return res.render("pages/profile/profileWithReplies", {
      user: user ? user : {},
      userFrontEndData,
      userProfile,
      profileUserJs,
      tab: "replies",
    });
  } catch (error) {
    next(createHttpError(500, "Internal server error!!"));
  }
};

// Module Export
module.exports = getProfileWithReplies;
