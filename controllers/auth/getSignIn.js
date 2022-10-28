// Get Sign In Page
const getSignIn = (req, res, next) => {
  try {
    res.render("pages/signin");
  } catch (error) {
    next(error);
  }
};

module.exports = getSignIn;
