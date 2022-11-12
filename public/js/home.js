// dom reference
const user_info = document.getElementById("user_info");
const main = document.getElementById("main");
const logout_add_account =
  document.getElementsByClassName("logout_add_account");
const tweetContentTextArea = document.querySelector("textarea#tweetContent");
const tweetBtn = document.querySelector("button.createTweetBtn");

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
const tweetedImgs = [];

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
