/* dependencies */

const User = require("../../models/auth/UserModel");
const upload = require("multer-uploader");
const path = require("path");

const uploadTweetImage = (req, res, next) => {
  try {
    const upload_dir = path.resolve(
      __dirname,
      `./../../public/uploads/${req._id}/tweets`
    );

    // return;
    const max_file_size = 1000000;
    const allowed_file_mime_type = ["image/png", "image/jpg", "image/jpeg"];
    upload(upload_dir, max_file_size, allowed_file_mime_type).any()(
      req,
      res,
      err => {
        if (err) {
          next(err);
        } else {
          next();
        }
      }
    );
  } catch (error) {
    next(error);
  }
};

module.exports = uploadTweetImage;
