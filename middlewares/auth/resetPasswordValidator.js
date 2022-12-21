/* dependencies */
const { check } = require("express-validator");
const createHttpError = require("http-errors");
const User = require("../../models/auth/UserModel");

/* reset password validator */
const resetPasswordValidator = (req, res, next) => {
  return [
    check("username")
      .trim()
      .notEmpty()
      .withMessage("Email or Username required")
      .toLowerCase()
      .custom(async (username, { req }) => {
        try {
          const user = await User.findOne(
            {
              $or: [{ username: username }, { email: username }],
            },
            { email: 1, username: 1 }
          );
          if (user) {
            req.username = user.username;
            req.email = user.email;
            req.isValidUser = true;
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        } catch (error) {
          createHttpError(500, error);
        }
      })
      .withMessage("User not found"),
  ];
};

/* export reset pass.. validator */
module.exports = resetPasswordValidator;
