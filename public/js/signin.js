// get elements
const getElement = (selector) => {
  return document.querySelector(selector);
};

// dom reference
const passIn = getElement("#password");
const passEyeIcon = getElement("#passEyeIcon");

// pass show and hide function

const showAndHidePass = (icon, field) => {
  icon.addEventListener("click", function (e) {
    const i = icon.querySelector("i");
    if (i.className === "fas fa-eye-slash") {
      i.className = "fas fa-eye";
      field.type = "text";
    } else {
      i.className = "fas fa-eye-slash";
      field.type = "password";
    }
  });
};

// pass show and hide
showAndHidePass(passEyeIcon, passIn);
