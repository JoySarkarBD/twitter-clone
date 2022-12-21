const password = document.querySelector("#password");
const passwordEyeIcon = document.querySelector("#passwordEyeIcon");
const confirmPassword = document.querySelector("#confirmPassword");
const confirmPasswordEyeIcon = document.querySelector(
  "#confirmPasswordEyeIcon"
);

/* show & hide password with icon */

function passwordHandler(handler, eventEl) {
  handler.addEventListener("click", function (e) {
    const i = this.querySelector("i");
    if (i.className === "fas fa-eye-slash") {
      i.className = "fas fa-eye";
      eventEl.type = "text";
    } else {
      i.className = "fas fa-eye-slash";
      eventEl.type = "password";
    }
  });
}

passwordHandler(passwordEyeIcon, password);
passwordHandler(confirmPasswordEyeIcon, confirmPassword);
