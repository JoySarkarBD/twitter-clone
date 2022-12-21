//dependencies

const createHttpError = require("http-errors");
const User = require("../../models/auth/UserModel");
require("dotenv").config();

//create user confirmation function
const confirmationHandler = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findOneAndUpdate(
      { _id },
      { $set: { status: "verified" } },
      { firstName: 1, lastName: 1 }
    );

    if (user) {
      res.render("pages/auth/thankyou", {
        name: user.firstName + " " + user.lastName,
        title: `Confirmation-${process.env.APP_NAME}`,
      });
    } else {
      throw createHttpError(500, "Internal server error");
    }
  } catch (error) {
    throw error;
  }
};

//export confirmation function
module.exports = confirmationHandler;
