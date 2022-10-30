// Dependencies
const { check } = require("express-validator");

const updatePasswordValidator = () => {
  return [
    // Password
    check("password")
      .trim()
      .isStrongPassword()
      .withMessage("Password is not strong.")
      .custom((value, { req }) => {
        req.password = value;
      }),
    check("confirmPassword")
      .custom((value, { req }) => {
        const password = req.password;
        if (value === password) {
          return true;
        } else {
          return false;
        }
      })
      .withMessage("Password didn't match."),
  ];
};

module.exports = updatePasswordValidator;