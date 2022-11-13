// Dependencies
const jwt = require("jsonwebtoken");

const loginChecker = async (req, res, next) => {
  try {
    if (req?.signedCookies?.access_token) {
      const token = req.signedCookies.access_token.split(" ")[1];
      const decode = await jwt.verify(token, process.env.JWT_SECRET);

      req.email = decode.email;
      req.userName = decode.userName;
      req.id = decode._id;
      if (req.originalUrl === "/signin" || req.originalUrl === "/signup") {
        return res.redirect("/");
      }
      next();
    } else {
      if (req.originalUrl === "/signup") {
        return res.render("pages/signup", { user: {}, error: {} });
      }

      res.render("pages/signin", { user: {}, error: {} });
    }
  } catch (error) {
    if (error.message === "jwt expired") {
      if (req.originalUrl === "/signup") {
        return res.render("pages/signup", { user: {}, error: {} });
      }

      res.render("pages/signin", { user: {}, error: {} });
    }
    next(error);
  }
};

// Module Export
module.exports = loginChecker;
