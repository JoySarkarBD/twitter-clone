// Dependencies
const { Schema, model, default: mongoose } = require("mongoose");

const tweetSchema = new Schema(
  {
    content: {
      type: String,
      trim: true,
      default: "",
    },
    images: [{ type: String }],
    tweetedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
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
