//dependencies
const bcrypt = require("bcrypt");

// create hash password function
const hashedPassword = async password => {
  try {
    return (password = await bcrypt.hash(password, 10));
  } catch (error) {
    throw error;
  }
};
//exports generated hash password
module.exports = hashedPassword;
