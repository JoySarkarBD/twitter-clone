const upload = require("multer-uploader");
const path = require("path");
const uploadTweetedImg = (req, res, next) => {
  try {
    const upload_dir = path.join(
      __dirname,
      `./../../public/uploads/${req.id}/tweets`
    );

    const max_file_size = 10000000;

    const allowed_file_mime_type = [
      "image/jpg",
      "image/jpeg",
      "image/png",
      "image/svg+xml",
    ];

    const uploader = upload(
      upload_dir,
      max_file_size,
      allowed_file_mime_type
    ).any();
    uploader(req, res, (err) => {
      if (err) {
        next(err);
      } else {
        next();
      }
    });
  } catch (error) {
    next(error);
  }
};
module.exports = uploadTweetedImg;
