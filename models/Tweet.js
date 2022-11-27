// Dependencies
const { Schema, model } = require("mongoose");

const tweetSchema = new Schema(
  {
    content: {
      type: String,
      trim: true,
      default: "",
    },
    images: [{ type: String }],
    tweetedBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    // user id who like this tweet
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // user id who retweeted this tweet
    retweetedUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // main tweet id which was retweeted
    tweetData: {
      type: Schema.Types.ObjectId,
      ref: "Tweet",
    },
  },
  {
    timestamps: true,
  }
);

// Model
const Tweet = model("Tweet", tweetSchema);

// Module Export
module.exports = Tweet;
