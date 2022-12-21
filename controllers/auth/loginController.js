//dependencies
const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//create login function
const loginController = async (req, res) => {
  try {
    if (req.isValidUser) {
      const token = await jwt.sign(
        {
          username: req.username,
          email: req.email,
          _id: req._id,
        },
        process.env.JWT_SECRETE,
        { expiresIn: "7d" }
      );
      res.status(200);
      res.cookie("access_token", "Bearer " + token, { signed: true });
      res.redirect("/");
    } else {
      res.send("Something went wrong");
    }
  } catch (error) {
    throw createHttpError(500, error);
  }
};

//export login function
module.exports = loginController;
