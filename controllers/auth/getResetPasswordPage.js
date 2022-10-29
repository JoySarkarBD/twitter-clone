// Dependencies

// Get  Reset Password Page
const getResetPasswordPage = (req, res, next) => {
  try {
    res.render("pages/auth/resetPassword", { user: {}, error: {} });
  } catch (error) {
    next(error);
  }
};

// Module Export
module.exports = getResetPasswordPage;
