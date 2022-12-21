/* dependencies */

const { check } = require("express-validator");

/* create updatePasswordValidator validator function */

const updatePasswordValidator = (req, res, next) => {
  return [
    //password
    check("password")
      .notEmpty()
      .withMessage("Password Required")
      .isLength({ min: 8 })
      .withMessage("Min 8 char required")
      .isStrongPassword()
      .withMessage("Password is not strong"),
    //confirm password
    check("confirmpassword")
      .notEmpty()
      .withMessage("Password Required")
      .isLength({ min: 8 })
      .withMessage("Min 8 char required")
      .isStrongPassword()
      .withMessage("Password is not strong")
      .custom((password, { req }) => {
        if (password === req.body.password) {
          req.password = password;
          return true;
        } else {
          return false;
        }
      })
      .withMessage("Passord doesn't Match"),
  ];
};

module.exports = updatePasswordValidator;
