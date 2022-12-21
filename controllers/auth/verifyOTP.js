/* dependencies */
const createHttpError = require("http-errors");
const OTP = require("../../models/auth/OtpModel");
/* create verify otp Controller */
const verifyOtp = async (req, res) => {
  try {
    const otp = Number(req.body.otp);
    const otpId = req.body.otpId;

    const otpObj = await OTP.findOne({ _id: otpId });
    if (otpObj.OTP === otp && otpObj.expiresIn.getTime() > Date.now()) {
      const result = await OTP.findOneAndUpdate(
        { _id: otpObj._id },
        { $set: { status: true } }
      );
      if (result) {
        res.render("pages/auth/createNewPassword", {
          error: {},
          user: {},
          otp: {
            otpId: result._id,
            otp: result.OTP,
          },
        });
      } else {
        createHttpError(500, "Something went wrong");
      }
    } else {
      const errMsg =
        otpObj.expiresIn.getTime() > Date.now() ? "Invalid OTP" : "Expired OTP";
      res.render("pages/auth/verifyOtp", {
        error: {
          otp: {
            msg: errMsg,
          },
        },
        otp: {
          value: otp,
          otpId: otpObj._id,
          email: otpObj.email,
        },
      });
    }
  } catch (error) {
    res.render("pages/auth/verifyOtp", {
      error: {
        otp: {
          msg: "Something Wrong",
        },
      },
      otp: {
        value: otp,
        otpId: otpObj._id,
        email: otpObj.email,
      },
    });
  }
};

module.exports = verifyOtp;
