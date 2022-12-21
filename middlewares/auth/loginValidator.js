//dependencies

const { check } = require("express-validator");
const bcrypt = require("bcrypt");
const createHttpError = require("http-errors");
const User = require("../../models/auth/UserModel");
const { updateOrSetdata } = require("../../utilities/cacheManager");

//create login validator
const loginValidator = () => {
  return [
    //username or email validation
    check("username")
      .notEmpty()
      .toLowerCase()
      .trim()
      .withMessage("Username or Email required")
      .custom(async (value, { req }) => {
        try {
          const user = await User.findOne({
            $or: [{ username: value }, { email: value }],
          });
          if (user) {
            req.username = user.username;
            req.email = user.email;
            req.password = user.password;
            req._id = user._id;
            updateOrSetdata(`users:${user._id}`, user);
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        } catch (error) {
          throw createHttpError(500, "Internal Server Error");
        }
      })
      .withMessage("User is not found"),

    //password validation
    check("password")
      .notEmpty()
      .withMessage("Password is required")
      .custom(async (password, { req }) => {
        if (!req.username) return true;
        try {
          const isValidUser = await bcrypt.compare(password, req.password);
          if (isValidUser) {
            req.isValidUser = true;
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        } catch (error) {
          throw createHttpError(500, error);
        }
      })
      .withMessage("Incorrect Password"),
  ];
};

//export login validator
module.exports = loginValidator;
