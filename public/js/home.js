// dom reference
const user_info = document.getElementById("user_info");
const main = document.getElementById("main");
const logout_add_account =
  document.getElementsByClassName("logout_add_account");
const tweetContentTextArea = document.querySelector("textarea#tweetContent");
const tweetBtn = document.querySelector("button.createTweetBtn");
const tweetContainer = document.querySelector(".tweetContainer ");

// logout modal
user_info.addEventListener("click", function () {
  if (logout_add_account[0].classList[2] === "invisible") {
    logout_add_account[0].classList.remove("invisible");
  } else {
    logout_add_account[0].classList.add("invisible");
  }
});

// tweet text area

tweetContentTextArea.addEventListener("input", function () {
  const val = this.value;
  if (val) {
    tweetBtn.removeAttribute("disabled");
    tweetBtn.style.backgroundColor = "rgb(29, 155, 240)";
  } else {
    tweetBtn.setAttribute("disabled", true);
    tweetBtn.style.backgroundColor = "#8ecdf8";
  }
});

//img preview for user to tweet

// dom reference
const tweetImg = document.querySelector("input#postImage");
const tweetedImgContainer = document.querySelector(".img_container");
let tweetedImgs = [];

tweetImg.addEventListener("change", function (e) {
  const imgFile = this.files;

  [...imgFile].forEach((file) => {
    if (
      ["image/jpg", "image/jpeg", "image/png", "image/svg+xml"].includes(
        file.type
      )
    ) {
      tweetBtn.removeAttribute("disabled");
      tweetBtn.style.backgroundColor = "rgb(29, 155, 240)";
      tweetedImgs.push(file);
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
        tweetedImgContainer.appendChild(htmlEle);
      };
      fr.readAsDataURL(file);
    } else {
      return;
    }
  });
});

// remove img from tweeted image container
tweetedImgContainer.addEventListener("click", function (e) {
  const cross_btn = e.target.id === "cross_btn" ? e.target : null;

  if (cross_btn) {
    const imgEle = cross_btn.parentElement;
    const fileName = imgEle.dataset.name;

    tweetedImgs.forEach((img, i) => {
      if (fileName === img.name) {
        tweetedImgs.splice(i, 1);
        imgEle.remove();

        if (!tweetedImgs.length && !tweetContentTextArea.value.trim()) {
          tweetBtn.setAttribute("disabled", true);
          tweetBtn.style.backgroundColor = "#8ecdf8";
        }
      }
    });
  } else {
    return;
  }
});

// submitting the tweet by the user
tweetBtn.addEventListener("click", function () {
  const content = tweetContentTextArea.value;

  if (tweetedImgs.length || content) {
    const form = new FormData();
    form.append("content", content);

    tweetedImgs.forEach((file) => {
      form.append(file.name, file);
    });

    const uri = `${window.location.origin}/posts`;
    fetch(uri, {
      method: "POST",
      body: form,
    })
      .then((result) => result.json())
      .then((data) => {
        const postEl = createTweet(data);
        tweetContainer.insertAdjacentElement("afterbegin", postEl);
        tweetContentTextArea.value = "";
        tweetedImgContainer.innerHTML = "";
        tweetBtn.setAttribute("disabled", true);
        tweetedImgs = [];
        tweetBtn.style.backgroundColor = "#8ecdf8";
      });
  }
});

// create tweet and show to ui
function createTweet(data) {
  const {
    content,
    images: tweetedImgs,
    tweetedBy: { _id, userName, firstName, lastName, avatarProfile },
    createdAt,
  } = data;

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
  div.className = "tweet d-flex justify-content-between border-bottom";
  div.innerHTML = `<div class="user_avatar pt-3 ps-2 pe-2">
                      <div class="img">
                        <img src="${
                          window.location.origin
                        }/uploads/profile/${avatarProfile}" alt="avatar"/></div>
                      </div>
                    <div class="tweetBody pt-2 w-100">
                      <div class="tweet_header d-flex justify-content-between">
                      <div class="user_time d-flex"><a class="displayName pe-2" href="http://"> ${
                        firstName + " " + lastName
                      } </a><span class="pe-2 userName"> @${userName}</span>
                      <div class="time pe-2">. ${time}</div>
                    </div>
                  </div>
                  <div class="tweet_content w-100">
                      <p class="pe-2 pb-2">${content}</p>
                  </div>
                  <div class="images">
                  
                  </div>
                  <div class="tweet_footer d-flex justify-content-between">
                      <div class="comment"><svg viewbox="0 0 24 24" aria-hidden="true">
                              <g></g>
                              <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
                          </svg><span class="ps-2 pe-2">10</span></div>
                      <div class="retweet"><svg viewbox="0 0 24 24" aria-hidden="true">
                              <g></g>
                              <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path>
                          </svg><span class="ps-2 pe-2">10</span></div>
                      <div class="like"> <svg viewbox="0 0 24 24" aria-hidden="true">
                              <g></g>
                              <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
                          </svg><span class="ps-2 pe-2">10</span></div>
                      <div class="share"> <svg viewbox="0 0 24 24" aria-hidden="true">
                              <g></g>
                              <path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"></path>
                          </svg></div>
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

/* 
`

<img class="pe-2 pb-2" src="/uploads/0d277e6ef0a26c1b95ac3b1a1f6aa7a6-1668345270831.jpg" alt=""/>
`; */
