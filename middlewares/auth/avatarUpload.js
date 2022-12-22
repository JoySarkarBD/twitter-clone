/* dependencies */
const upload = require("multer-uploader");
const path = require("path");

/* avatar upload middleware */
function avatarUploader(req, res, next) {
  const upload_dir = path.join(__dirname, "/../../temp");
  //file size
  const max_file_size = 100000000;
  //file type
  const avatar_mime_type = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/svg+xml",
  ];

  //upload middleware
  upload(upload_dir, max_file_size, avatar_mime_type).single("avatarProfile")(
    req,
    res,
    (err) => {
      if (err) {
        const error = {
          avatarProfile: {
            msg: err.message,
          },
        };
        req.error = error;
        next();
      } else {
        next();
      }
    }
  );
}

/* exports */
module.exports = avatarUploader;
