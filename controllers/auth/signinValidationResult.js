// Dependencies
const { validationResult } = require("express-validator");

const signInValidation = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    try {
      console.log(mappedErrors);
      return res.render("pages/signin", {
        user: req.body ? req.body : {},
        error: mappedErrors,
      });
    } catch (error) {
      throw error;
    }
  }
};

// Module Export
module.exports = signInValidation;
