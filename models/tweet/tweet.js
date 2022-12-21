const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      trim: true,
      default: "",
    },
    tweetImages: [
      {
        type: String,
      },
    ],
    tweetedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    retweetUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    postData: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tweet",
    },
    replyTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tweet",
    },
    replyPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet",
      },
    ],
  },
  { timestamps: true }
);

const Tweet = new mongoose.model("Tweet", tweetSchema);
module.exports = Tweet;
