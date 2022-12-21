/* dependencies */
const User = require("../../models/auth/UserModel");

/* username checked controller */
const checkUserName = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username }, { username: 1 });
    if (user) {
      res.send(user);
    } else {
      res.send({});
    }
  } catch (error) {
    throw error;
  }
};

/* export func */
module.exports = checkUserName;
