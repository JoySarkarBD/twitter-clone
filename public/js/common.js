/* selections */
const modal = document.querySelector("#modall");
const leftSide = document.querySelector(".left_side");
const middleSide = document.querySelector(".middle_side");
const rightSide = document.querySelector(".right_side");
const option = document.querySelector("#option");
const tweetContainer = document.querySelector(".tweetContainer");

/* reply modal */
const replyContent = document.querySelector("textarea#replyContent");
const replyBtn = document.querySelector("button#replyBtn");
const replyImgContainer = document.querySelector(".replyImgContainer");
const replyImgFile = document.querySelector("input#replyImg");

/* global variable */
modal.hidden = true;
let replyImages = [];

/* modal area  */

option.addEventListener("click", function (e) {
  if (this.id === "option") {
    if (modal.hidden) {
      modal.hidden = false;
    } else {
      modal.hidden = true;
    }
  }
});

//middle & right side modal closing function

[middleSide, rightSide].forEach(el => {
  el.addEventListener("click", function (e) {
    if (this.className === "middle_side") {
      if (!modal.hidden) {
        modal.hidden = true;
      }
    } else if (this.className === "right_side") {
      if (!modal.hidden) {
        modal.hidden = true;
      }
    }
  });
});

//left modal closing function

leftSide.children[0].addEventListener("click", function () {
  if (this.className === "top_side") {
    if (!modal.hidden) {
      modal.hidden = true;
    }
  }
});

/* modal area close */

function createTweet(tweetObj) {
  let removeBtn = "";
  let reTweetedHtml = "";
  let replyTo = "";
  let data = tweetObj;
  if (data.postData) {
    data = data.postData;
    reTweetedHtml =
      user.username === tweetObj.tweetedBy.username
        ? `
          <p class="retweetedHtml"><i class="fas fa-retweet"></i> <span>You retweeted</span></p>
        `
        : `
        <p class="retweetedHtml"><i class="fas fa-retweet"></i> Retwetted By <a href=${window.location.origin}/profile/${tweetObj.tweetedBy.username}>${tweetObj.tweetedBy.username} </a> </p>
      `;
  }
  const {
    _id: postId,
    content,
    tweetImages,
    likes,
    retweetUsers,
    replyPosts,
    tweetedBy: { _id, firstName, lastName, username, profileAvatar },
    createdAt,
  } = data;
  /* delete post */
  if (tweetObj.tweetedBy?._id === user?._id) {
    removeBtn = `
                  <div class="dropleft">
                    <button data-toggle="dropdown" aria-expanded="false" class="postMore">
                    <i class="fas fa-ellipsis-h"></i>
                    </button> 
                    
                    <div class="dropdown-menu" >
    
                      <a class="dropdown-item" href="#" >
                      <button onclick ="deletePost('${tweetObj._id}')" class="removeBtn"> <i class="fas fa-trash" ></i> Remove Tweet </button>
                      </a>
    
                    </div>
                  </div>
          
        `;
  }

  /* reply post */
  if (data.replyTo?.tweetedBy?.username) {
    replyTo = `
        <div class="replyFlag">
          <p>Replying to @<a href="/profile/${data.replyTo?.tweetedBy?.username}">
          ${data.replyTo?.tweetedBy?.username}</a></p>
        </div>
        
        `;
  }

  //time functionality
  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + "y";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + "m";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + "d";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + "h";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + "min";
    }
    return "Just now";
  }
  const time = timeSince(new Date(createdAt).getTime());
  /* avatar img */
  const avatarSrc = profileAvatar
    ? `/uploads/${_id}/profile/${profileAvatar}`
    : "/uploads/profile/profileAvatar.png";

  const postContainer = document.createElement("div");
  // postContainer.classList.add("tweet");
  postContainer.innerHTML = `
      ${reTweetedHtml}
      <div class="tweet" onclick="singlePostPage(event, '${postId}')">
      <div class="avatar_area">
        <div class="postedImg">
          <img src="${avatarSrc}" alt="" />
        </div>
      </div>
      <div class="tweet_body">
          <div class="header">
                  <div class="headerItems">
                    <a class="displayName" href="/profile/${username}">${
    firstName + " " + lastName
  }             
                    </a>
                        <span class="username">@${username}</span>
                        <div class="date">.${time}</div>
                  
                  </div>
            
                  ${removeBtn}
          </div>
        ${replyTo}
        <div class="content">
        ${content}
        </div>
        <div class="images">
          
        </div>
        <div class="footer">
    
        
          <button class="replay" data-data='${JSON.stringify(
            data
          )}' onclick="tweetReply(event,'${postId}')">
            <i class="fas fa-comment"></i>
            <span>${replyPosts.length || ""}</span>
          </button>
    
    
          <button class="retweet ${
            retweetUsers.includes(user._id) ? "active" : ""
          }" onclick = "retweetPosts(event,'${postId}')">
            <i class="fas fa-retweet"></i>
            <span>${retweetUsers.length || ""}</span>
          </button>
    
    
          <button class="like ${
            user.likes.includes(postId) ? "active" : ""
          }" onclick="likePost(event,'${postId}')" >
            <i class="fas fa-heart"></i>
            <span>${likes.length ? likes.length : ""}</span>
          </button>
        </div>
        </div>
        </div>
      `;
  const imgContainer = postContainer.querySelector("div.images");

  tweetImages.forEach(img => {
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("postImg");
    imgDiv.innerHTML = `<img src="${window.location.origin}/uploads/${_id}/tweets/${img}" alt=""/>`;
    imgContainer.appendChild(imgDiv);
  });
  return postContainer;
}

/* =============== active/disable TODO:reply btn by depending on content ================== */

replyContent.addEventListener("input", function (e) {
  if (this.value) {
    replyBtn.removeAttribute("disabled");
  } else {
    replyBtn.setAttribute("disabled", true);
  }
});

/* ===========TODO:Reply image upload[img show or remove function] =====================*/

replyImgFile.addEventListener("change", function (e) {
  replyBtn.removeAttribute("disabled");
  [...this.files].forEach(file => {
    if (!["image/png", "image/jpg", "image/jpeg"].includes(file.type)) return;
    replyImages.push(file);
    const reader = new FileReader();
    reader.onload = function () {
      const imgFile = document.createElement("div");
      imgFile.classList.add("img");
      imgFile.dataset.name = file.name;
      imgFile.innerHTML = `<span id="closeBtn">
                                  <i style="pointer-events: none" class="fas fa-times"></i>
                                  </span>
                                  <img>`;
      const img = imgFile.querySelector("img");
      img.src = reader.result;
      replyImgContainer.appendChild(imgFile);
    };
    reader.readAsDataURL(file);
  });
});

/*TODO:  Reply remove btn */
replyImgContainer.addEventListener("click", function (e) {
  const removeBtn = e.target.id === "closeBtn" ? e.target.id : null;
  if (!removeBtn) return;
  const img = e.target.parentElement;
  const name = img.dataset.name;
  replyImages.forEach((file, i) => {
    if (name === file.name) {
      replyImages.splice(i, 1);
      img.remove();
      if (!replyImages.length && !replyContent.value) {
        replyBtn.setAttribute("disabled", true);
      }
    }
  });
});

/* tweetReply============================= */

function tweetReply(event, postId) {
  let replyBtn = event.target;
  const data = JSON.parse(replyBtn.dataset?.data);
  let modal = document.querySelector("#replyModal");
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = "";
  const tweetEl = createTweet(data);
  modalBody.appendChild(tweetEl);

  const replyTweetBtn = document.querySelector("button#replyBtn");
  replyTweetBtn.addEventListener("click", function (e) {
    const content = replyContent.value;
    if (!(content || replyImages.length)) return;

    const formData = new FormData();
    formData.append("content", content);
    replyImages.forEach(file => {
      formData.append(file.name, file);
    });

    const url = `${window.location.origin}/posts/reply/${postId}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          window.location.reload();
        }
      })
      .catch(error => {
        console.log(error);
      });
  });

  $(modal).modal("toggle");
}

/* Clear Reply Data */

function clearReplyData() {
  replyContent.value = "";
  replyImgContainer.innerHTML = "";
  replyImages.length = [];
  replyBtn.setAttribute("disabled", true);
}

/* single post page route */

function singlePostPage(event, postId) {
  if (event.target.localName === "button") return;
  const url = `${window.location.origin}/singlepage/${postId}`;
  window.location.href = url;
}

/* delete post function */

function deletePost(postId) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(result => {
    if (result.isConfirmed) {
      const url = `${window.location.origin}/posts/${postId}`;
      fetch(url, {
        method: "DELETE",
      })
        .then(res => res.json())
        .then(data => {
          if (data) {
            window.location.reload();
          } else {
            window.location.href = `/`;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  });
}

/* like a post ========================================================*/

function likePost(event, postId) {
  const likeBtn = event.target;
  const span = likeBtn.querySelector("span");
  const url = `${window.location.origin}/posts/like/${postId}`;
  fetch(url, {
    method: "PUT",
  })
    .then(res => res.json())
    .then(data => {
      const post = data.post;
      const userId = data.user._id;
      if (post.likes.includes(userId)) {
        likeBtn.classList.add("active");
      } else {
        likeBtn.classList.remove("active");
      }
      span.innerText = post.likes.length ? post.likes.length : "";
    });
}

/* retweet post ============================================================ */

function retweetPosts(event, postId) {
  const retweetBtn = event.target;
  const span = retweetBtn.querySelector("span");
  const url = `${window.location.origin}/posts/retweet/${postId}`;
  fetch(url, {
    method: "POST",
  })
    .then(res => res.json())
    .then(data => {
      if (data) {
        window.location.reload();
      }
    });
}
