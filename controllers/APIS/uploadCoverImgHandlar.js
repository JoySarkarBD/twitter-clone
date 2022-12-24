/* dependencies */

const createHttpError = require("http-errors");
const User = require("../../models/auth/UserModel");
const { updateOrSetdata } = require("../../utilities/cacheManager");

async function uploadCoverImgHandlar(req, res, next) {
  try {
    const userId = req._id;
    const coverPhotoName = req.files[0].filename;
    const user = await User.findByIdAndUpdate(
      userId,
      {
        coverPhoto: coverPhotoName,
      },
      { new: true }
    );
    updateOrSetdata(`users:${user._id}`, user);
    res.json(user);
  } catch (error) {
    next(createHttpError(500, "Internal Server Error"));
  }
}

/* export */
module.exports = uploadCoverImgHandlar;
