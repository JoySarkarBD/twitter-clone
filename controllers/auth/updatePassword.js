/* dependencies */
let jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");
const OTP = require("../../models/auth/OtpModel");
const User = require("../../models/auth/UserModel");
const hashedPassword = require("../../utilities/hasedPassword");

/* update password controller */
const updatePassword = async (req, res) => {
  try {
    const otp = Number(req.body.otp);
    const otpId = req.body.otpId;
    const password = req.password;
    const otpObj = await OTP.findOne({ _id: otpId });
    if (otpObj.OTP === otp && otpObj.status === true) {
      const email = otpObj.email;
      const hasPassword = await hashedPassword(password);
      const userObj = await User.findOneAndUpdate(
        { email },
        { $set: { password: hasPassword } }
      );
      if (userObj) {
        const token = await jwt.sign(
          {
            username: userObj.username,
            email: userObj.email,
            _id: userObj._id,
          },
          process.env.JWT_SECRETE,
          { expiresIn: "7d" }
        );
        res.status(200);
        res.cookie("access_token", "Bearer " + token, { signed: true });
        res.redirect("/");
      } else {
        createHttpError(500, "Internal Server Error");
      }
    } else {
      createHttpError(500, "Internal Server Error");
    }
  } catch (error) {
    throw createHttpError(500, error);
  }
};

module.exports = updatePassword;
