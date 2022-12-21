/* login page handler */
const loginHandler = (req, res, next) => {
  try {
    res.render("pages/login", { user: {}, error: {} });
  } catch (error) {
    next(error);
  }
};

module.exports = loginHandler;
