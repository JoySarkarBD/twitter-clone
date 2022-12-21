/* following & follower */
async function followHandler(e, userId) {
  const url = `${window.location.origin}/profile/${userId}/follow`;
  const res = await fetch(url, {
    method: "PUT",
  });
  let data = await res.json();

  if (data._id) {
    const isFollowing = data.followers && data.followers.includes(user._id);
    const followBtn = e.target;
    const followingBtn = document.querySelector("a.following span");
    const followersBtn = document.querySelector("a.followers span");

    if (isFollowing) {
      if (userProfile._id === user._id) {
        followingBtn.textContent = parseInt(followingBtn.textContent) + 1 + " ";
      }
      followBtn.textContent = "Following";
      followBtn.classList.add("active");
    } else {
      if (userProfile._id === user._id) {
        followingBtn.textContent = parseInt(followingBtn.textContent) - 1 + " ";
      }
      followBtn.textContent = "Follow";
      followBtn.classList.remove("active");
    }

    if (data._id === userProfile._id) {
      followingBtn.textContent = data.following.length + " ";
      followersBtn.textContent = data.followers.length + " ";
    }
  }
}

/* followingBtn.textContent = data.following.length + " ";
followersBtn.textContent = data.followers.length + " "; */

/* display followers & following */
const followers = (userProfile && userProfile?.followers) || [];
const following = (userProfile && userProfile?.following) || [];

/* selection */
const followContainer = document.querySelector(".profileTweetContainer");

/* making decision that which tab is open */
if (tab === "followers") {
  followers.forEach(user => {
    const followElement = createFollowEl(user);
    followContainer.appendChild(followElement);
  });
} else {
  following.forEach(user => {
    const followElement = createFollowEl(user);
    followContainer.appendChild(followElement);
  });
}

/* create follow or following div */
function createFollowEl(data) {
  const name = `${data.firstName} ${data.lastName}`;

  const isFollowing = data?.followers?.includes(user._id);

  let followBtn = "";

  if (data._id !== user._id) {
    followBtn = `
    <button class="follow ${
      isFollowing ? "active" : ""
    }" id="followBtn" onclick="followHandler(event, '${data._id}')">
    
    ${isFollowing ? "Following" : "Follow"} 

    </button>
    
      `;
  }

  const imgSrc = data.profileAvatar
    ? `/uploads/${data._id}/profile/${data.profileAvatar}`
    : "/uploads/profile/profileAvatar.png";

  const div = document.createElement("div");
  div.classList.add("follow");
  div.innerHTML = `
        <div class="socialConnectivity">
        
          <div class="avatar">
              <img src=${imgSrc}>
          </div>
          
          <div class="displayName">

              <a href="/profile/${data.username}">
                  <h5>${data.username}</h5>
              </a>

              <span>@${name}</span>

          </div>
        
        </div>

        <div class="followBtn">
            ${followBtn}
        </div>
    
    
    `;

  return div;
}
