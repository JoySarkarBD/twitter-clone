/* dependencies */

const createHttpError = require("http-errors");
const OTP = require("../../models/auth/OtpModel");
const User = require("../../models/auth/UserModel");
const sendemail = require("../../utilities/sendemail");

/* create reset password controller */
const resetPasswordController = async (req, res) => {
  try {
    if (req.isValidUser) {
      const user = await User.findOne(
        {
          $or: [{ username: req.username }, { email: req.email }],
        },
        { email: 1 }
      );
      if (user) {
        const otpObj = new OTP({
          OTP: Math.floor(100000 + Math.random() * 9000),
          email: user.email,
          expiresIn: Date.now() + 120010,
        });
        const otp = await otpObj.save();

        await sendemail(
          [user.email],
          {
            subject: "Reset Your Password",
            template: `Your OTP is : ${otp.OTP}`,
            attachment: [],
          },
          (err, info) => {
            if (info?.messageId) {
              res.render("pages/auth/verifyOtp", {
                error: {},
                otp: { value: null, otpId: otp._id, email: otp.email },
              });
            } else {
              throw err;
            }
          }
        );
      }
    } else {
      res.send("muri kha");
    }
  } catch (error) {
    createHttpError(500, error);
  }
};

/* export function */
module.exports = resetPasswordController;
