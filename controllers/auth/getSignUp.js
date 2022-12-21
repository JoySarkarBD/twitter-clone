/* signup page handler */
const signupHandler = (req, res, next) => {
  try {
    res.render("pages/signup", {
      user: {},
      error: {},
    });
  } catch (error) {
    next(error);
  }
};
module.exports = signupHandler;
