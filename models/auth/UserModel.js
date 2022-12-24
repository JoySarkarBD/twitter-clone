const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
    },

    lastName: {
      type: String,
      trim: true,
      minLength: 1,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 6,
    },

    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      validator: {
        validate: value => {
          return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          );
        },
      },
    },

    password: {
      type: String,
      required: true,
      validator: {
        validate: value => {
          return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8}$/.test(value);
        },
      },
    },

    profileAvatar: {
      type: String,
    },

    coverPhoto: {
      type: String,
    },

    status: {
      type: String,
      enum: ["unverified", "verified", "suspended"],
      default: "unverified",
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet",
      },
    ],

    retweetPost: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet",
      },
    ],

    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = new mongoose.model("User", UserSchema);

module.exports = User;
