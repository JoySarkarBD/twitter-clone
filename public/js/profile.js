const loadTweets = async () => {
  try {
    const result = await fetch(
      `${window.location.origin}/posts?tweetedBy=${profileUser._id}&replyTo=${
        tab === "replies"
      }`
    );
    const tweets = await result.json();
    if (tweets.length) {
      tweets.forEach((tweet) => {
        const tweetElement = createTweet(tweet);
        tweetContainer.insertAdjacentElement("afterbegin", tweetElement);
      });
    } else {
      return (tweetContainer.innerHtml = `<h4>Nothing to show.</h4>`);
    }
  } catch (error) {}
};
loadTweets();
