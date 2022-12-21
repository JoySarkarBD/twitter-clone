/* dependencies */

const { validationResult } = require("express-validator");

/* password validatetor result */
const resetPasswordResult = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    return res.render("pages/auth/resetpassword", {
      error: mappedErrors,
      user: req.body ? req.body : {},
    });
  }
};

/* export func.. */
module.exports = resetPasswordResult;
