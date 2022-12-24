/* dependencies */

const createHttpError = require("http-errors");
const User = require("../../models/auth/UserModel");
const { cacheGetAndSet } = require("../../utilities/cacheManager");

const searchTweetsHandler = async (req, res, next) => {
  try {
    const user = await cacheGetAndSet(`users:${req._id}`, async () => {
      const newUser = await User.findOne({ _id: req._id });
      return newUser;
    });
    const userJs = JSON.stringify(user);

    return res.render("pages/search/search", { user, userJs, tab: "posts" });
  } catch (error) {
    next(createHttpError(500, "Internal Server Error"));
  }
};

module.exports = searchTweetsHandler;
