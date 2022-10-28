// Dependencies
const createHttpError = require("http-errors");
const User = require("../../models/User");

// Email confirmation handler
const emailConfirmation = async (req, res) => {
  try {
    const userId = req.params.id;

    const result = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          status: "verified",
        },
      }
    );

    if (result) {
      res.render("pages/auth/thankyou", { title: "Thank you" });
    } else {
      throw createHttpError(500, "Sorry, internal server error!!");
    }
  } catch (error) {
    throw error;
  }
};

// Module Export
module.exports = emailConfirmation;
