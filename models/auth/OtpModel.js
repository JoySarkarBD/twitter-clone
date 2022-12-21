/* dependencies */
const mongoose = require("mongoose");

/* otp schema */
const otpSchema = new mongoose.Schema(
  {
    OTP: {
      type: Number,
      minLength: 6,
      required: true,
      trim: true,
    },
    status: {
      type: Boolean,
      default: false,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      validator: {
        validate: function (value) {
          return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          );
        },
      },
    },
    expiresIn: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const OTP = new mongoose.model("OTP", otpSchema);

/* export OTP model */
module.exports = OTP;
