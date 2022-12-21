/* dependencies */

const { validationResult } = require("express-validator");

/* create updatePasswordResult  */
const updatePasswordResult = (req, res, next) => {
  const errors = validationResult(req);
  const mappedError = errors.mapped();
  if (Object.keys(mappedError).length === 0) {
    next();
  } else {
    res.render("pages/auth/createNewPassword", {
      error: mappedError,
      user: {},
      otp: {
        otp: req.body.otp,
        otpId: req.body.otpId,
      },
    });
  }
};

module.exports = updatePasswordResult;
