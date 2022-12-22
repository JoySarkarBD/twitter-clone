/* dependencies */

const createHttpError = require("http-errors");
const User = require("../../models/auth/UserModel");
const { updateOrSetdata } = require("../../utilities/cacheManager");

/* create upload Avatar Handlar func */

const uploadAvatarHandler = async (req, res, next) => {
  try {
    const userId = req._id;
    const imgFileName = req.files[0].filename;
    const user = await User.findByIdAndUpdate(
      userId,
      { profileAvatar: imgFileName },
      { new: true }
    );
    // return console.log(user);
    updateOrSetdata(`users:${user._id}`, user);
    res.json(user);
  } catch (error) {
    // console.log(error);
    next(createHttpError(500, "Internal Server Error"));
  }
};

/* export func */
module.exports = uploadAvatarHandler;
