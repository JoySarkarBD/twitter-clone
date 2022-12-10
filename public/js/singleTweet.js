// load single tweets
const loadSingleTweet = async () => {
  try {
    const result = await fetch(
      `${window.location.origin}/posts/getSingleTweet/${postID}`
    );
    const tweet = await result.json();
    if (tweet === null) return (location.href = "/");
    // console.log(tweet);
    const tweetElement = createTweet(tweet);
    tweetContainer.appendChild(tweetElement);

    tweet.repliedPost?.forEach(async (postID) => {
      const result = await fetch(
        `${window.location.origin}/posts/getSingleTweet/${postID}`
      );
      const tweet = await result.json();

      const tweetElement = createTweet(tweet);
      tweetContainer.appendChild(tweetElement);
    });
  } catch (error) {}
};
loadSingleTweet();
