// Dependencies
const { validationResult } = require("express-validator");

const updatePasswordValidatorResult = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    try {
      return res.render("pages/auth/createNewPassword", {
        error: mappedErrors,
        opt: {
          otpId: req.otpId,
          otp: req.otp,
        },
      });
    } catch (error) {
      throw error;
    }
  }
};

module.exports = updatePasswordValidatorResult;
