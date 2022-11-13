const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const OTP = require("../../models/OTP");
const User = require("../../models/User");
const hashString = require("../../utilities/hashString");
require("dotenv").config();

const updateNewPassword = async (req, res, next) => {
  try {
    const otpIn = req.body?.otp;
    const otpId = req.body?.otpId;
    const password = req.body?.password;

    const otpObj = await OTP.findOne({ _id: otpId });

    if (Number(otpIn) === otpObj.otp && otpObj.status) {
      const newPass = await hashString(password);
      const result = await User.findOneAndUpdate(
        { email: otpObj?.email },
        {
          $set: {
            password: newPass,
          },
        }
      );
      if (result) {
        const token = await jwt.sign(
          {
            userName: result.userName,
            email: result.email,
          },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );

        res.status(200);
        res.cookie("access_token", "Bearer " + token, { signed: true });

        res.redirect("/");
      } else {
        throw createHttpError(500, "Internal server problem....!");
      }
    } else {
      throw createHttpError(500, "Internal server problem....!");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = updateNewPassword;
