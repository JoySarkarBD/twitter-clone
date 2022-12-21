/* dependencies */

const createHttpError = require("http-errors");
const User = require("../../models/auth/UserModel");
const { cacheGetAndSet } = require("../../utilities/cacheManager");

/* home controller */

const homeController = async (req, res) => {
  try {
    const user = await cacheGetAndSet(`users:${req._id}`, async () => {
      const newUser = await User.findOne({ _id: req._id });
      return newUser;
    });

    const userJs = JSON.stringify(user);

    res.render("pages/home/home", { user, userJs });
  } catch (error) {
    throw createHttpError(500, error);
  }
};

/* export */
module.exports = homeController;
