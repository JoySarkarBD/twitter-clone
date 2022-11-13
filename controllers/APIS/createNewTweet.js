const createNewTweet = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.files);
  } catch (error) {
    next(error);
  }
};

module.exports = createNewTweet;
