/* dependencies */
const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/* create authentication checker */
const loginChecker = async (req, res, next) => {
  try {
    if (req.signedCookies.access_token) {
      const token = req.signedCookies.access_token.split(" ")[1];
      const decode = await jwt.verify(token, process.env.JWT_SECRETE);
      req.username = decode.username;
      req.email = decode.email;
      req._id = decode._id;

      if (req.originalUrl === "/signup" || req.originalUrl === "/login") {
        return res.redirect("/");
      }
      next();
    } else {
      if (req.originalUrl === "/signup") {
        return res.render("pages/signup", { user: {}, error: {} });
      }
      return res.render("pages/login", { user: {}, error: {} });
    }
  } catch (error) {
    if (error.message === "jwt expired") {
      if (req.originalUrl === "/signup") {
        return res.render("pages/signup", { user: {}, error: {} });
      }
      return res.render("pages/login", { user: {}, error: {} });
    }
    next(error);
  }
};

/* export authentication function */
module.exports = loginChecker;
