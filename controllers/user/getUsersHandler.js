/* dependencies */

const createHttpError = require("http-errors");
const User = require("../../models/auth/UserModel");

const getUsersHandler = async (req, res, next) => {
  try {
    let filter = {};
    if (req.query.searchText) {
      let queryTxt = req.query.searchText;
      filter = {
        $or: [
          { firstName: { $regex: new RegExp(queryTxt) } },
          { lastName: { $regex: new RegExp(queryTxt) } },
          { username: { $regex: new RegExp(queryTxt) } },
          { email: queryTxt },
        ],
      };
    }

    const users = await User.find(filter);
    res.json(users);
  } catch (error) {
    console.log(error);
    next(createHttpError(500, "Internal Server Error"));
  }
};

module.exports = getUsersHandler;
