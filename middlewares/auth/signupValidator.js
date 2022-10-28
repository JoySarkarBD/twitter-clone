// Dependencies
const { check } = require("express-validator");
const User = require("../../models/User");

const signupDataValidator = () => {
  return [
    // first name
    check("firstName").trim().notEmpty().withMessage("First name is required!"),

    // last name
    check("lastName").trim().notEmpty().withMessage("Last name is required!"),

    // user name
    check("userName")
      .trim()
      .notEmpty()
      .toLowerCase()
      .withMessage("User name is required!")
      .custom(async (val, { req }) => {
        try {
          const user = await User.findOne({ userName: val }, { userName: 1 });
          if (user) {
            return Promise.reject();
          } else {
            return Promise.resolve;
          }
        } catch (error) {
          throw error;
        }
      })
      .isLength({ min: 3 })
      .withMessage("userName should have minimum 3 characters!"),

    // email
    check("email")
      .trim()
      .toLowerCase()
      .notEmpty()
      .withMessage("Email is required!")
      .isEmail()
      .withMessage("Email is invalid!")
      .custom(async (val, { req }) => {
        try {
          const user = await User.findOne({ email: val }, { email: 1 });
          if (user) {
            return Promise.reject();
          } else {
            return Promise.resolve;
          }
        } catch (error) {
          throw error;
        }
      })
      .withMessage("Email already used!"),

    // password
    check("password")
      .notEmpty()
      .withMessage("Password is required!")
      .isStrongPassword()
      .withMessage("Password should be strong!"),

    // confirm password
    check("confirmPassword")
      .notEmpty()
      .withMessage("confirm Password is required!")
      .isStrongPassword()
      .withMessage("confirm Password should be strong!")
      .custom((val, { req }) => {
        const pass = req.body.password;
        // matching password with confirm password field
        if (val === pass) {
          return true;
        } else {
          return false;
        }
      })
      .withMessage("Password doesn't match!"),
  ];
};

module.exports = signupDataValidator;
