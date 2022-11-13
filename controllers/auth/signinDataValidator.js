// Dependencies
const { check } = require("express-validator");
const bcrypt = require("bcrypt");
const createHttpError = require("http-errors");
const User = require("../../models/User");

const signInDataValidator = () => {
  return [
    // User name or email
    check("userName")
      .trim()
      .notEmpty()
      .withMessage("User name is required!!")
      .toLowerCase()
      .custom(async (value, { req }) => {
        try {
          const user = await User.findOne(
            {
              $or: [
                {
                  userName: value,
                },
                {
                  email: value,
                },
              ],
            },
            {
              userName: 1,
              email: 1,
              password: 1,
            }
          );

          if (user) {
            req.userName = user.userName;
            req.email = user.email;
            req.password = user.password;
            req.id = user._id;

            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        } catch (error) {
          throw createHttpError(500, error);
        }
      })
      .withMessage("Sorry, user is not found!!"),

    // Password
    check("password")
      .trim()
      .notEmpty()
      .withMessage("User password is required")
      .custom(async (password, { req }) => {
        if (!req.password) return true;

        try {
          const isValidUser = await bcrypt.compare(password, req.password);

          if (isValidUser) {
            req.validUser = true;

            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        } catch (error) {
          throw createHttpError(500, error);
        }
      })
      .withMessage("Your password is wrong!!"),
  ];
};

// Module Export
module.exports = signInDataValidator;
