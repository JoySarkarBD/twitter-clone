// Get Sign Up Page
const getSignUp = (req, res, next) => {
  try {
    res.render("pages/signup", { error: {}, user: {} });
  } catch (error) {
    next(error);
  }
};

module.exports = getSignUp;
