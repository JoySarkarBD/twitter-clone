/* dependencies */

const createHttpError = require("http-errors");

/* create get reset password func */
const getResetPassword = (req, res) => {
  try {
    res.render("pages/auth/resetPassword", { error: {}, user: {} });
  } catch (error) {
    createHttpError(500, error);
  }
};

/* export module */
module.exports = getResetPassword;
