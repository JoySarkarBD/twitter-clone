/* dependencies */
const createError = require("http-errors");

/* not found handler */
function notFoundHandler(req, res) {
  throw createError(404, "Your Page was not found");
}

/* error handler */

function errorHandler(err, req, res, next) {
  const error =
    process.env.NODE_ENV === "development" ? err : { message: err.message };
  // res.locals.html = true;
  if (res.headerSent) {
    next(error);
  } else {
    try {
      res.locals.error = error;
      const code = 500;
      res.status(error.status || code);

      if (res.locals.html) {
        res.render("pages/error", { title: `Error page` });
      } else {
        res.json(error);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
