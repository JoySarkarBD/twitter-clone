//dependencies
const { validationResult } = require("express-validator");
const createHttpError = require("http-errors");

//create login validation result function
const loginValidatorResult = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    try {
      return res.render("pages/login", {
        user: req.body ? req.body : {},
        error: mappedErrors,
      });
    } catch (error) {
      throw createHttpError(500, error);
    }
  }
};

//export function
module.exports = loginValidatorResult;
