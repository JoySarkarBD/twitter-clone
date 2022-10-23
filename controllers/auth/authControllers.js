// Dependencies

// Get Sign In Page
const getSignIn = (req, res, next) => {
  try {
    res.render("pages/signin");
  } catch (error) {
    next(error);
  }
};

// Get Sign Up Page
const getSignUp = (req, res, next) => {
  try {
    res.render("pages/signup", { error: {}, user: {} });
  } catch (error) {
    next(error);
  }
};

// Post Sign Up Page Controller
const signupController = (req, res, next) => {
  // handle file upload error
  if (Object.keys(req.error) !== 0) {
    console.log(req.error);
    return res.render("pages/signup", {
      user: req.body,
      error: req.error,
    });
  } else {
    console.log(req.body);
  }
};

// Module Export
module.exports = {
  getSignIn,
  getSignUp,
  signupController,
};
