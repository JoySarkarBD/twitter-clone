//dependencies
const { validationResult } = require("express-validator");

//check validation result
const signupValidateResult = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    req.error ? req.error : {};
    req.error = { ...req.error, ...mappedErrors };
    next();
  }
};

//export middleware
module.exports = signupValidateResult;
