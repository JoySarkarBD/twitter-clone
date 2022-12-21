const User = require("../../models/auth/UserModel");
const hashedPassword = require("../../utilities/hasedPassword");
const sendemail = require("../../utilities/sendemail");
const fs = require("fs");
const path = require("path");

/* register controller */
const registerHandler = async (req, res, next) => {
  try {
    if (Object.keys(req.error ? req.error : {}).length !== 0) {
      return res.render("pages/signup", {
        user: req.body,
        error: req.error,
      });
    } else {
      //extract all field data from req.body
      let { firstName, lastName, username, email, password } = req.body;
      //encrypt password
      password = await hashedPassword(password);
      //extract filename from req.file
      const profileAvatar = req.file?.filename || "";

      //user Object
      const userObj = new User({
        firstName,
        lastName,
        username,
        email,
        password,
        profileAvatar,
        coverPhoto: "",
        likes: [],
        retweetPost: [],
      });

      const user = await userObj.save();

      /* make folder for image file */
      fs.mkdirSync(
        path.join(__dirname, `../../public/uploads/${user._id}/profile/`),
        {
          recursive: true,
        }
      );

      /* cut avatar img from temp file to own file */
      if (profileAvatar) {
        fs.rename(
          path.join(__dirname, `../../temp/${profileAvatar}`),
          path.join(
            __dirname,
            `../../public/uploads/${user._id}/profile/${user.profileAvatar}`
          ),
          err => {
            if (err) {
              console.log(err);
            } else {
              console.log(`${profileAvatar} uploaded successfully `);
            }
          }
        );
      }

      if (user._id) {
        sendemail(
          //receiver Array[]
          [user.email],

          //options {}
          {
            subject: "Verify Your Account",
            template: `Verification link : ${process.env.APP_URL}/emailconfirmation/${user._id}`,
            attachment: [],
          },

          //callback function
          (err, info) => {
            if (!err && info) {
              return res.render("pages/auth/confirmation", {
                name: user.firstName + " " + user.lastName,
                email: user.email,
                title: `Confirmation - ${process.env.APP_NAME}`,
              });
            }
          }
        );
      } else {
        next(createHttpError(500, "Internal server error"));
      }
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//export register controller
module.exports = registerHandler;
