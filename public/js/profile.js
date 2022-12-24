/* load all posts or replies */

async function loadPostOrReplies() {
  try {
    /* url */
    const url = `${window.location.origin}/posts?tweetedBy=${
      userProfile._id
    }&replyTo=${tab === "replies"}`;

    const result = await fetch(url);
    const posts = await result.json();

    posts.forEach((post) => {
      const tweetEl = createTweet(post);
      tweetContainer.insertAdjacentElement("afterbegin", tweetEl);
    });

    if (tab === "posts") {
      const url = `${window.location.origin}/posts?tweetedBy=${userProfile._id}&pinned=true`;
      const result = await fetch(url);
      const pinnedPosts = await result.json();
      if (pinnedPosts) {
        pinnedPosts.forEach((post) => {
          const tweetEl = createTweet(post, true);
          tweetContainer.insertAdjacentElement("afterbegin", tweetEl);
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}
loadPostOrReplies();

/* following & follower */
async function followHandler(e, userId) {
  const url = `${window.location.origin}/profile/${userId}/follow`;
  const res = await fetch(url, {
    method: "PUT",
  });
  const data = await res.json();
  if (data) {
    const isFollowing = data.followers && data.followers.includes(user._id);
    const followBtn = e.target;
    const followingBtn = document.querySelector("a.following span");
    const followersBtn = document.querySelector("a.followers span");

    if (isFollowing) {
      followBtn.textContent = "Following";
      followBtn.classList.add("active");
      followingBtn.textContent = data.following.length + " ";
      followersBtn.textContent = data.followers.length + " ";
    } else {
      followBtn.textContent = "Follow";
      followBtn.classList.remove("active");
      followingBtn.textContent = data.following.length + " ";
      followersBtn.textContent = data.followers.length + " ";
    }
  }
}
