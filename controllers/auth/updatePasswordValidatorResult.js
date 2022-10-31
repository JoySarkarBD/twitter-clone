// Dependencies
const { validationResult } = require("express-validator");

const updatePasswordValidatorResult = (req, res, next) => {
  try {
    const errors = validationResult(req);

    const mappedErrors = errors.mapped();

    if (Object.keys(mappedErrors).length === 0) {
      next();
    } else {
      return res.render("pages/auth/createNewPassword", {
        error: mappedErrors,
        opt: {
          otpId: req.body?.otpId,
          otp: req.body?.otp,
        },
      });
    }
  } catch (error) {
    throw error;
  }
};

module.exports = updatePasswordValidatorResult;
