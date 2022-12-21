/* dependencies */

/* create logout functionality */
const logoutHandler = (req, res) => {
  res.clearCookie("access_token");
  res.redirect("/");
};

/* export logout handler */
module.exports = logoutHandler;
