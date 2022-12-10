// dom reference for creating new tweet
const user_info = document.querySelector("#user_info");
const main = document.querySelector("#main");
const logout_add_account = document.querySelector(".logout_add_account");
const tweetContentTextArea = document.querySelector("textarea#tweetContent");
const tweetBtn = document.querySelector("button.createTweetBtn");
const tweetContainer = document.querySelector(".tweetContainer ");
const tweetImg = document.querySelector("input#postImage");
const tweetedImgContainer = document.querySelector(".img_container");

// dom reference for replying to tweet
const replyContentTextArea = document.querySelector("#replyContentTextArea");
const replyImgContainer = document.querySelector(".replyImgContainer");
const replyImgInp = document.querySelector("input#replyImgInp");
const replyBtn = document.querySelector("button.replyBtn");

// create tweet and show to ui
function createTweet(data) {
  let newData = data;
  let reTweetHtmlWithData = "";
  let replyTo = "";
  let deleteTweet = "";
  // retweeted to whom tweet dom element
  if (data.tweetData) {
    // delete btn tweet dom element
    if (data?.tweetedBy._id === user._id) {
      deleteTweet = `<button onclick="deleteTweet('${data._id}')" class="ellip_icn me-2 border-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
        </button>`;
    }
    newData = data?.tweetData;
    reTweetHtmlWithData = `
      <div class="retweet_msg d-flex align-items-center">
      <svg viewBox="0 0 24 24" aria-hidden="true">
      <g></g>
      <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path>
      </svg>
        <p>
        ${
          data.tweetedBy.userName === user.userName
            ? "You retweeted."
            : "Retweeted By @<a href=/profile/" +
              data.tweetedBy.userName +
              ">" +
              data.tweetedBy.userName +
              "</a>"
        }
        
    
        
        </p>
      </div>`;
  }
  // reply to whom tweet dom element
  if (data.replyTo?.tweetedBy?.userName) {
    replyTo = `<div class="replyFlag">
      <p>Replying to @<a href="profile/${data.replyTo.tweetedBy.userName}">${data.replyTo.tweetedBy.userName}</a></p>
      </div>
      `;
  }
  // main tweet destructed data
  const {
    _id: postID,
    content,
    images: tweetedImgs,
    tweetedBy: { _id, userName, firstName, lastName, avatarProfile },
    createdAt,
    likes,
    repliedPost,
    retweetedUsers,
  } = newData;
  // delete btn tweet dom element
  if (newData?.tweetedBy._id === user._id) {
    deleteTweet = `<button onclick="deleteTweet('${data._id}')" class="ellip_icn me-2 border-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
        </button>`;
  }
  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return "Just Now.";
  }

  const time = timeSince(new Date(createdAt).getTime());

  const div = document.createElement("div");
  div.innerHTML = `
    ${reTweetHtmlWithData}
    <div class="tweet d-flex justify-content-between border-bottom" onclick="openTweet(event, '${postID}')">
      <div class="user_avatar pt-3 ps-2 pe-2">
        <div class="img">
          <img src="${
            window.location.origin
          }/uploads/profile/${avatarProfile}" alt="avatar"/></div>
        </div>
      <div class="tweetBody position-relative pt-2 w-100">
        <div class="tweet_header d-flex justify-content-between">
        <div class="user_time d-flex">
        <a class="displayName pe-2" href="${
          window.location.origin
        }/profile/${userName}"> ${
    firstName + " " + lastName
  } </a><span class="pe-2 userName"> @${userName}</span>
        <div class="time pe-2">. ${time}</div>
      </div>
      ${deleteTweet}
    </div>
      ${replyTo}
    <div class="tweet_content w-100">
        <p class="pe-2 pb-2">${content}</p>
    </div>
  <div class="images">
  
  </div>
  <div class="tweet_footer d-flex justify-content-between">
  
  <!--Comment btn-->
  <div data-post='${JSON.stringify(
    data
  )}' onclick="replyHandler(event, '${postID}')" data-toggle="modal" data-target="#replyModal" data-toggle="tooltip", data-placement="bottom", title="Reply" class="comment">
    <svg class="${
      repliedPost.length ? "activeComment" : ""
    }" viewbox="0 0 24 24" aria-hidden="true">
      <g></g>
      <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
      </svg>
      <span class="replyCount ps-2 pe-2">${
        repliedPost.length ? repliedPost.length : ""
      }</span>
  </div>
  
  <!--Retweet btn-->
  <div class="retweet" onclick="retweetHandler(event,'${postID}')">
    <svg class="${
      user.yourRetweets.includes(postID) ? "active_retweet" : ""
    }" viewbox="0 0 24 24" aria-hidden="true">
    <g></g>
    <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path>
    </svg><span id="retweet_length" class="ps-2 pe-2 ${
      user.yourRetweets.includes(postID) ? "retweet_count" : " "
    }">${retweetedUsers.length ? retweetedUsers.length : ""}</span>
  </div>
  
  <!--Like btn-->
  <div onclick="likeHandler(event,'${postID}')" class="like"> 
    <svg class="${
      user.tweetsYouLike.includes(postID) ? "active" : ""
    }" viewbox="0 0 24 24" aria-hidden="true">
    <g></g>
    <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z">
    </path>
    </svg><span id="like_length" class="ps-2 pe-2 ${
      likes.length ? "like_count" : ""
    } ">${likes.length ? likes.length : ""}</span>
  </div>
  
  <!--Share btn-->
  <div class="share"> <svg viewbox="0 0 24 24" aria-hidden="true">
    <g></g>
    <path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"></path>
    </svg>
  </div>
  
  </div>
  </div>
  </div>
  `;

  const imgContainer = div.querySelector("div.images");
  tweetedImgs.forEach((images) => {
    const img = document.createElement("img");
    img.className = "pe-2 pb-2";
    img.setAttribute(
      "src",
      `${window.location.origin}/uploads/${_id}/tweets/${images}`
    );
    imgContainer.appendChild(img);
  });
  return div;
}

// reply text area
replyContentTextArea.addEventListener("input", function () {
  const val = this.value;
  if (val || replyImgContainer.length) {
    replyBtn.removeAttribute("disabled");
    replyBtn.style.backgroundColor = "rgb(29, 155, 240)";
  } else {
    replyBtn.setAttribute("disabled", true);
    replyBtn.style.backgroundColor = "#8ecdf8";
  }
});

//img preview for user to reply
let replyImgs = [];

replyImgInp.addEventListener("change", function (e) {
  const imgFile = this.files;
  [...imgFile].forEach((file) => {
    if (
      ["image/jpg", "image/jpeg", "image/png", "image/svg+xml"].includes(
        file.type
      )
    ) {
      replyBtn.removeAttribute("disabled");
      replyBtn.style.backgroundColor = "rgb(29, 155, 240)";
      replyImgs.push(file);
      const fr = new FileReader();
      fr.onload = function () {
        const htmlEle = document.createElement("div");
        htmlEle.classList.add("img");
        htmlEle.dataset.name = file.name;
        htmlEle.innerHTML = `<span id="cross_btn">
                              <i class="fas fa-times"></i>
                             </span><img>`;
        const img = htmlEle.querySelector("img");
        img.src = fr.result;
        replyImgContainer.appendChild(htmlEle);
      };
      fr.readAsDataURL(file);
    } else {
      return;
    }
  });
});

// remove img from tweet reply image container
replyImgContainer.addEventListener("click", function (e) {
  const cross_btn = e.target.id === "cross_btn" ? e.target : null;

  if (cross_btn) {
    const imgEle = cross_btn.parentElement;
    const fileName = imgEle.dataset.name;

    replyImgs.forEach((img, i) => {
      if (fileName === img.name) {
        replyImgs.splice(i, 1);
        imgEle.remove();

        if (!replyImgs.length && !replyContentTextArea.value.trim()) {
          replyBtn.setAttribute("disabled", true);
          replyBtn.style.backgroundColor = "#8ecdf8";
        }
      }
    });
  } else {
    return;
  }
});

// like handler
const likeHandler = (event, postID) => {
  const likeBtn = event.target;
  const svg = likeBtn.querySelector("svg");
  const span = likeBtn.querySelector("#like_length");
  const url = `${window.location.origin}/posts/like/${postID}`;
  fetch(url, {
    method: "PUT",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.likes.includes(user._id)) {
        svg.classList.add("active");
        span.classList.add("like_count");
      } else {
        svg.classList.remove("active");
        span.classList.remove("like_count");
      }
      span.innerText = data.likes.length ? data.likes.length : "";
    });
};

// retweet handler
const retweetHandler = (event, postID) => {
  const retweet = event.target;
  const svg = retweet.querySelector("svg");
  const span = retweet.querySelector("#retweet_length");
  const url = `${window.location.origin}/posts/retweet/${postID}`;
  fetch(url, {
    method: "POST",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.retweetedUsers.includes(user._id)) {
        svg.classList.add("active_retweet");
        span.classList.add("retweet_count");
      } else {
        svg.classList.remove("active_retweet");
        span.classList.remove("retweet_count");
      }
      span.innerText = data.retweetedUsers.length
        ? data.retweetedUsers.length
        : "";
    });
};

// Reply handler
const replyHandler = (event, postID) => {
  const replyButton = event.target;
  const postObj = JSON.parse(replyButton.dataset.post);
  const modal = document.querySelector("#replyModal");
  const modalBody = modal.querySelector(".modal-body");
  modalBody.innerHTML = "";
  const tweetElement = createTweet(postObj);
  modalBody.appendChild(tweetElement);

  replyBtn.addEventListener("click", function () {
    const replyContent = replyContentTextArea.value;
    if (replyImgs.length || replyContent) {
      const form = new FormData();
      form.append("replyContent", replyContent);

      replyImgs.forEach((file) => {
        form.append(file.name, file);
      });
      const uri = `${window.location.origin}/posts/reply/${postID}`;
      fetch(uri, {
        method: "POST",
        body: form,
      })
        .then((result) => result.json())
        .then((data) => {
          // return console.log(data);
          if (data._id) {
            window.location.reload();
          }
        });
      clearReplyData();
    }
  });
};

// clear reply field
const clearReplyData = () => {
  replyContentTextArea.innerHTML = "";
  replyImgContainer.value = "";
  replyBtn.setAttribute("disable", "");
  replyBtn.style.background = "#8ecaf3";
};

// main tweet open
const openTweet = (event, postID) => {
  const targetElement = event.target;
  if (
    [...targetElement.classList].includes("like") ||
    [...targetElement.classList].includes("comment") ||
    [...targetElement.classList].includes("retweet") ||
    [...targetElement.classList].includes("share") ||
    [...targetElement.classList].includes("ellip_icn")
  )
    return;

  window.location.href = `${window.location.origin}/posts/singleTweet/${postID}`;
};

//delete tweet function
function deleteTweet(postID) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      const url = `${window.location.origin}/posts/${postID}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            // return console.log(data);
            location.reload();
            window.location.reload();
          } else {
            window.location.href = "/";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
}

// logout modal
user_info.addEventListener("click", function () {
  if (logout_add_account.classList[2] === "invisible") {
    logout_add_account.classList.remove("invisible");
  } else {
    logout_add_account.classList.add("invisible");
  }
});
