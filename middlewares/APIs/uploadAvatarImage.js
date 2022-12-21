const createHttpError = require("http-errors");
const upload = require("multer-uploader");
const path = require("path");

const uploadAvatarImage = (req, res, next) => {
  try {
    /*logged user id */
    const id = req._id;

    /* upload directory */
    const upload_dir = path.join(
      __dirname,
      `./../../public/uploads/${id}/profile/`
    );

    /* max file size */
    const max_file_size = 1000000;

    /* allwed mime type */
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
    next(createHttpError(500, "Internal Server Error"));
  }
};

module.exports = uploadAvatarImage;
