const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const OTP = require("../../models/OTP");

const verifyOTP = async (req, res, next) => {
  const otpIn = req.body?.otp;
  const otpId = req.body?.otpId;
  const otpObj = await OTP.findOne({ _id: otpId });
  try {
    if (
      Number(otpIn) === otpObj.otp &&
      otpObj?.expireIn.getTime() > Date.now()
    ) {
      const output = await OTP.findOneAndUpdate(
        {
          _id: otpObj._id,
        },
        {
          $set: {
            status: true,
          },
        }
      );

      if (output) {
        res.render("pages/auth/createNewPassword", {
          error: {},
          user: {},
          otp: { otpId: output._id, otp: output.otp },
        });
      } else {
        throw createHttpError(500, "Internal server error.");
      }
    } else {
      const errMessage =
        otpObj?.expireIn.getTime() > Date.now() ? "Invalid OTP" : "Expired OTP";
      res.render("pages/auth/verifyOTP", {
        error: {
          otp: {
            msg: errMessage,
          },
        },
        otp: {
          value: otpIn,
          otpId: otpId,
          email: otpObj?.email,
        },
      });
    }
  } catch (error) {
    res.render("pages/auth/verifyOTP", {
      error: {
        otp: {
          msg: "Some problems getting here...!",
        },
      },
      otp: {
        value: otpIn,
        otpId: otpId,
        email: otpObj?.email,
      },
    });
  }
};

module.exports = verifyOTP;
