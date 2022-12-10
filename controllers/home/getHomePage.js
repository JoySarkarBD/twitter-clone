// Dependencies
const createHttpError = require("http-errors");
const User = require("../../models/User");
const { getAndSetCachedData } = require("../../utilities/cachedManagement");

const getHomePage = async (req, res, next) => {
  try {
    const user = await getAndSetCachedData(`user:${req.id}`, async () => {
      const newData = await User.findOne(
        { userName: req.userName },
        { password: 0 }
      );
      return newData;
    });
    delete user.password;
    const userFrontEndData = JSON.stringify(user);
    return res.render("pages/home/home", {
      user: user ? user : {},
      userFrontEndData,
    });
  } catch (error) {
    next(createHttpError(500, "Sorry, internal server error!!"));
  }
};

// Module Export
module.exports = getHomePage;
