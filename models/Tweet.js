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
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Model
const Tweet = model("Tweet", tweetSchema);

// Module Export
module.exports = Tweet;
