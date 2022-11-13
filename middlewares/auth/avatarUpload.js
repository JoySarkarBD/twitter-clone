// Dependencies
const upload = require("multer-uploader");
const path = require("path");

function avatarUpload(req, res, next) {
  //directory
  const uploadDirectory = path.join(__dirname, "/../../public/uploads/profile");
  // file size
  const maxFileSize = 10000000;
  // allowed file formate
  const allowedMimeType = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/svg+xml",
  ];

  upload(uploadDirectory, maxFileSize, allowedMimeType).single("avatarProfile")(
    req,
    res,
    (err) => {
      if (err) {
        const user = req.body;

        const error = {
          avatarProfile: {
            msg: err?.message,
          },
        };

        res.render("pages/signup", {
          user,
          error,
        });
      } else {
        next();
      }
    }
  );
}

// Module Export
module.exports = avatarUpload;
