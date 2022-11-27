// Dependencies
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validator: {
        validate: function (value) {
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
        validate: function (value) {
          return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value);
        },
      },
    },
    // user profile picture
    avatarProfile: {
      type: String,
      required: true,
    },
    // user status
    status: {
      type: String,
      enum: ["unverified", "verified", "suspended"],
      default: "unverified",
    },
    // tweets id which are liked by this user
    tweetsYouLike: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tweet",
      },
    ],
    //  tweets id which are retweeted by this user
    yourRetweets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tweet",
      },
    ],
  },

  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

// Module Export
module.exports = User;
