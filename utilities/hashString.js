const bcrypt = require("bcrypt");

const hashString = async (str) => {
  const hashedStr = await bcrypt.hash(str, 10);
  return hashedStr;
};

module.exports = hashString;
