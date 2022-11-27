const Tweet = require("../../models/Tweet");

const replyHandler = async (req, res, next) => {
  const postID = req.params.postID;
  //   এখানে আমার post id টা পাচ্ছে না। এটা নিয়ে কাল কাজ করবো।
  return console.log(postID);
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
    tweetData.images.push(file);
  });

  const tweetObj = await Tweet(tweetData).save();
  await Tweet.findOneAndUpdate(postID, {
    $addToSet: {
      repliedPost: tweetObj._id,
    },
  });
  return res.json(tweetObj);
};

module.exports = replyHandler;
