// Dependencies
const OTP = require("../../models/OTP");
const User = require("../../models/User");
const sendEmail = require("../../utilities/sendEmail");
require("dotenv").config();

const getRestPasswordOTP = async (req, res, next) => {
  const userName = req.body.userName;

  try {
    const user = await User.findOne(
      {
        $or: [
          {
            email: userName,
          },
          {
            userName: userName,
          },
        ],
      },
      { email: 1 }
    );

    if (user) {
      const otpObj = new OTP({
        otp: Math.floor(Math.random() * 900000 + 100000),
        email: user.email,
        expireIn: Date.now() + 180000,
      });

      const otp = await otpObj.save();

      await sendEmail(
        [user.email],
        {
          subject: "Reset your twitter password",
          template: `Your OTP is: ${otp.otp}`,
          attachments: [],
        },

        function (err, info) {
          if (info?.messageId) {
            res.render("pages/auth/verifyOtp", {
              error: {},
              otp: {
                value: null,
                otpId: otp._id,
                email: user.email,
              },
            });
          } else {
            throw err;
          }
        }
      );
    } else {
      res.render("pages/auth/resetPassword", {
        error: {
          userName: {
            msg: "User not found!",
          },
        },
      });
    }
  } catch (error) {}
};

// Module Export
module.exports = getRestPasswordOTP;
