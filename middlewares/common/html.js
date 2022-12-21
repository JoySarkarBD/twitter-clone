/* dependencies */

function htmlResponse(title) {
  return (req, res, next) => {
    res.locals.title = title;
    res.locals.html = true;
    next();
  };
}
// exports
module.exports = htmlResponse;
