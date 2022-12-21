/* dependencies */

const createHttpError = require("http-errors");
const User = require("../../models/auth/UserModel");
const { updateOrSetdata } = require("../../utilities/cacheManager");

/* create upload Avatar Handlar func */

const uploadAvatarHandlar = async (req, res, next) => {
  try {
    const userId = req._id;
    const imgFileName = req.files[0].filename;
    const user = await User.findByIdAndUpdate(
      userId,
      { profileAvatar: imgFileName },
      { new: true }
    );
    updateOrSetdata(`users:${user._id}`, user);
    res.json(user);
  } catch (error) {
    next(createHttpError(500, "Internal Server Error"));
  }
};

/* export func */
module.exports = uploadAvatarHandlar;
