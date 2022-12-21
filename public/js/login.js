/* dependencies */
const passwordEl = document.querySelector("#password");
const passwordEyeIcon = document.querySelector("#passwordEyeIcon");

passwordEyeIcon.addEventListener("click", function (e) {
  const i = this.querySelector("i");
  if (i.className === "fas fa-eye-slash") {
    i.className = "fas fa-eye";
    passwordEl.type = "text";
  } else {
    i.className = "fas fa-eye-slash";
    passwordEl.type = "password";
  }
});
