// Dependencies

const logout = (req, res) => {
  res.clearCookie("access_token");
  res.redirect("/signin");
};

// Module Export
module.exports = logout;
