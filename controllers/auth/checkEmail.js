/* dependencies */

const User = require("../../models/auth/UserModel");

/* create email checker controller */
const checkEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email }, { email: 1 });
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
module.exports = checkEmail;
