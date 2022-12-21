const createHttpError = require("http-errors");
const User = require("../../models/auth/UserModel");
const { cacheGetAndSet } = require("../../utilities/cacheManager");

const singlePageHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await cacheGetAndSet(`users:${req._id}`, async () => {
      const newUser = await User.findOne({ _id: req._id });
      return newUser;
    });

    const userJs = JSON.stringify(user);
    const postId = JSON.stringify(id);

    res.render("pages/singlepage/singlePostPage", { user, userJs, postId });
  } catch (error) {
    throw createHttpError(500, error);
  }
};

module.exports = singlePageHandler;
