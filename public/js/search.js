/* selection */
const searchInput = document.querySelector("input#searchInput");
const searchTweetContainer = document.querySelector(".searchTweetContainer");
const userContainer = document.querySelector(".userContainer");

searchTweetContainer.innerHTML = `
    <h5 class="searchTitle">Please, search with a keyword</h5>

`;
let timer;
searchInput.addEventListener("input", function (e) {
  clearTimeout(timer);
  const searchText = this.value;

  if (searchText) {
    timer = setTimeout(() => {
      const url = `${window.location.origin}/${tab}?searchText=${searchText}`;

      searchTweetContainer.innerHTML = `
        <div class="spinner">
            <div class="spinner-border"  style="width: 3rem; height: 3rem;" role="status">
                <span class="visually-hidden"></span>
            </div>
        </div> `;

      fetch(url)
        .then(res => res.json())
        .then(data => {
          if (data.length) {
            searchTweetContainer.innerHTML = "";
            userContainer.innerHTML = "";

            if (tab === "posts") {
              data.forEach(post => {
                const tweetEl = createTweet(post);
                searchTweetContainer.insertAdjacentElement(
                  "afterbegin",
                  tweetEl
                );
              });
            } else {
              data.forEach(user => {
                const userElement = createFollowEl(user);
                userContainer.appendChild(userElement);
              });
            }
          } else {
            searchTweetContainer.innerHTML = `
                <h5 class="searchTitle">Sorry, no data found </h5>
              `;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }, 800);
  } else {
    searchTweetContainer.innerHTML = `
            <h5 class="searchTitle">Please, search with a keyword</h5>`;
    userContainer.innerHTML = "";
  }
});
