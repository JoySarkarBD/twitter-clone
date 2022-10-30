// Dependencies
const hashString = require("../../utilities/hashString");
const User = require("../../models/User");
const sendEmail = require("../../utilities/sendEmail");
const createHttpError = require("http-errors");

// Post Sign Up Page Controller
const signupController = async (req, res, next) => {
  // handle file upload error
  if (Object.keys(req.error ? req.error : {}).length !== 0) {
    return res.render("pages/signup", {
      user: req.body,
      error: req.error,
    });
  } else {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const userName = req.body.userName;
    const email = req.body.email;
    const password = await hashString(req.body.password);
    const avatarProfile = req.file?.filename || "defaultAvatar.jpg";

    const userObj = User({
      firstName,
      lastName,
      userName,
      email,
      password,
      avatarProfile,
    });
    const user = await userObj.save();
    if (user.id) {
      sendEmail(
        [user.email],
        {
          subject: "Verify Your Account",
          template: `Verification link:${process.env.APP_URL}/emailconfirmation/${user.id}`,
          attachments: [],
        },
        (err, info) => {
          if (!err && info) {
            return res.render("pages/auth/confirmation", {
              email: user.email,
              title: `Confirmation - ${process.env.APP_NAME}`,
            });
          } else {
            console.log(err);
            next(createHttpError(500, "Internal server error."));
          }
        }
      );
    }
  }
};

// Module Export
module.exports = signupController;
