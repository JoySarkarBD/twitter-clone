// Dependencies
const { Schema, model } = require("mongoose");

const otpSchema = new Schema(
  {
    otp: {
      type: Number,
      required: true,
      trim: true,
      minLength: 6,
    },
    status: {
      type: Boolean,
      required: true,
      default: false,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    expireIn: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Model
const OTP = model("OTP", otpSchema);

// Module Export
module.exports = OTP;
