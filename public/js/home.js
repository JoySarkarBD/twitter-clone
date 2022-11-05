const user_info = document.getElementById("user_info");
const main = document.getElementById("main");
const logout_add_account =
  document.getElementsByClassName("logout_add_account");

user_info.addEventListener("click", function () {
  if (logout_add_account[0].classList[2] === "invisible") {
    logout_add_account[0].classList.remove("invisible");
  } else {
    logout_add_account[0].classList.add("invisible");
  }
});
