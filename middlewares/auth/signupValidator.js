//dependencies
const { check } = require("express-validator");
const User = require("../../models/auth/UserModel");

//validate all fields with express-validator
function signupValidator() {
  return [
    //first name
    check("firstName").trim().notEmpty().withMessage("First Name Is required"),

    //last name
    check("lastName").trim().notEmpty().withMessage("Last Name Is Required"),

    //user name
    check("username")
      .trim()
      .notEmpty()
      .withMessage("User Name Is Required")
      .toLowerCase()
      .isLength({ min: 3 })
      .withMessage("Min Three Charecter Required")
      .custom(async (value, { req }) => {
        let user = await User.findOne({ username: value }, { username: 1 });
        if (user) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      })
      .withMessage("User Name already in use"),

    //email
    check("email")
      .trim()
      .notEmpty()
      .withMessage("Email Is Required")
      .toLowerCase()
      .isEmail()
      .withMessage("Invalid Email")
      .custom(async (value, { req }) => {
        try {
          const user = await User.findOne({ email: value }, { email: 1 });
          if (user) {
            return Promise.reject();
          } else {
            return Promise.resolve();
          }
        } catch (error) {
          throw error;
        }
      })
      .withMessage("Email already in use"),

    //password
    check("password")
      .notEmpty()
      .withMessage("Password is required")
      .isStrongPassword()
      .withMessage("Password is not strong"),

    //confirm password
    check("confirmpassword")
      .notEmpty()
      .withMessage("Password is required")
      .isStrongPassword()
      .withMessage("Password is not strong")
      .custom((value, { req }) => {
        const password = req.body.password;
        if (value !== password) {
          return false;
        } else {
          return true;
        }
      })
      .withMessage("Password doesn't match"),
  ];
}

//export signupValidator
module.exports = signupValidator;
