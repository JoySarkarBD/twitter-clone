const Tweet = require("../../models/Tweet");
const { updateCacheData } = require("../../utilities/cachedManagement");
const populator = require("../../utilities/populator");

const replyHandler = async (req, res, next) => {
  const postID = req.params.id;
  const userID = req.id;
  const files = req.files;
  const replyContent = req.body.replyContent;
  const tweetData = {
    content: replyContent,
    images: [],
    tweetedBy: userID,
    likes: [],
    retweetedUsers: [],
    tweetData: null,
    replyTo: postID,
    repliedPost: [],
  };
  files.forEach((file) => {
    tweetData.images.push(file.filename);
  });
  const tweetObj = new Tweet(tweetData);
  await tweetObj.save();

  const replyToTweet = await Tweet.findOneAndUpdate(postID, {
    $addToSet: {
      repliedPost: tweetObj._id,
    },
  });
  await populator(tweetObj);
  await populator(replyToTweet);
  await updateCacheData(`tweet:${tweetObj._id}`, tweetObj);
  await updateCacheData(`tweet:${replyToTweet._id}`, replyToTweet);
  return res.json(tweetObj);
};

module.exports = replyHandler;
