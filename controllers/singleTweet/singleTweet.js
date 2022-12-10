// Dependencies
const createHttpError = require("http-errors");
const User = require("../../models/User");
const { getAndSetCachedData } = require("../../utilities/cachedManagement");

const singleTweet = async (req, res, next) => {
  try {
    const postID = req.params.id;
    const userID = req.id;
    const user = await getAndSetCachedData(`user:${req.id}`, async () => {
      const newData = await User.findOne(
        { userName: req.userName },
        { password: 0 }
      );
      return newData;
    });
    delete user.password;
    const userFrontEndData = JSON.stringify(user);
    return res.render("pages/singleTweet/singleTweet", {
      user: user ? user : {},
      userFrontEndData,
      postID,
    });
  } catch (error) {
    next(createHttpError(500, "Sorry, internal server error!!"));
  }
};

// Module Export
module.exports = singleTweet;
