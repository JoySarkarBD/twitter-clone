/* get all post */
const loadPosts = async () => {
  const data = await fetch(
    `${window.location.origin}/singlepost/post/${postId}`
  );
  const post = await data.json();
  const postEl = createTweet(post);
  tweetContainer.appendChild(postEl);
  if (post.replyPosts.length) {
    post.replyPosts.forEach(async postId => {
      const data = await fetch(
        `${window.location.origin}/singlepost/post/${postId}`
      );
      const post = await data.json();
      const postEl = createTweet(post);
      tweetContainer.appendChild(postEl);
    });
  }
};

loadPosts();
