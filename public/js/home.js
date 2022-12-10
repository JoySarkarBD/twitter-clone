// tweet text area
tweetContentTextArea.addEventListener("input", function () {
  const val = this.value;
  if (val || tweetContainer.length) {
    tweetBtn.removeAttribute("disabled");
    tweetBtn.style.backgroundColor = "rgb(29, 155, 240)";
  } else {
    tweetBtn.setAttribute("disabled", true);
    tweetBtn.style.backgroundColor = "#8ecdf8";
  }
});

//img preview for user to tweet
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

// load all tweets
const loadAllTweet = async () => {
  try {
    const result = await fetch(`${window.location.origin}/posts`);
    const tweets = await result.json();
    if (!tweets.length) {
      return (tweetContainer.innerHTML = `<h4>There are no tweets available here.</h4>`);
    }
    tweets.forEach((tweet) => {
      const tweetElement = createTweet(tweet);
      tweetContainer.insertAdjacentElement("afterbegin", tweetElement);
    });
  } catch (error) {}
};

loadAllTweet();
