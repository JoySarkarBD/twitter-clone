// get elements
const getElement = (selector) => {
  return document.querySelector(selector);
};

// dom reference
const passInp = getElement("#password");
const passEyeIcon = getElement("#passEyeIcon");
const confirmPassInp = getElement("#confirmPassword");
const confirmPassEyeIcon = getElement("#confirmPassEyeIcon");
const pass_errors = getElement("#pass_errors");
const pass_matched = getElement("#pass_matched");

// pass validator alert message
pass_errors.hidden = true;
pass_matched.hidden = true;

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
showAndHidePass(passEyeIcon, passInp);
// confirm pass show and hide
showAndHidePass(confirmPassEyeIcon, confirmPassInp);

// pass validator alert function

const passValidator = (pass) => {
  let message = [];
  if (pass.length < 8) {
    message.push("8 characters");
  }
  if (pass.search(/[a-z]/) < 0) {
    message.push("1 lowercase letter");
  }
  if (pass.search(/[A-Z]/) < 0) {
    message.push("1 uppercase letter");
  }
  if (pass.search(/[0-9]/) < 0) {
    message.push("1 digit");
  }
  if (pass.search(/[\!\@\#\$\%\^\&\*\(\)\_\+\.\,\;\:\-]/) < 0) {
    message.push("1 special character.");
  }

  return message;
};

// match pass function

const checkPass = (pass) => {
  let passValidationResult = pass ? passValidator(pass) : [];

  if (passValidationResult.length > 0) {
    const alertMsg = `Password must contain at least ${passValidationResult}`;
    if (pass) {
      pass_errors.hidden = false;
      pass_errors.textContent = alertMsg;
    } else {
      return;
    }
  } else {
    matchConfirmPass();
  }
};

// match confirm password
const matchConfirmPass = () => {
  if (passInp.value !== confirmPassInp.value) {
    pass_errors.hidden = false;
    pass_errors.textContent = "Password doesn't match.";
  } else {
    pass_errors.textContent = "Password match.";
    pass_errors.hidden = false;
    pass_errors.style.color = "green";
    checkPass(passInp.value);
  }
};

// keypress event on password input field
let typingTimer;
const typingInterval = 500;

passInp.addEventListener("keyup", function () {
  clearTimeout(typingTimer);

  pass_errors.hidden = true;
  if (passInp.value) {
    typingTimer = setTimeout(() => checkPass(passInp.value), typingInterval);
  }
});

// keypress event on password input field
passInp.addEventListener("keydown", function () {
  clearTimeout(typingTimer);
});

confirmPassInp.addEventListener("keyup", function () {
  clearTimeout(typingTimer);
  pass_errors.hidden = true;

  if (confirmPassInp.value) {
    typingTimer = setTimeout(() => checkPass(), typingInterval);
  } else {
    return;
  }
});

// keydown event on confirm password input field
confirmPassInp.addEventListener("keydown", function () {
  clearTimeout(typingTimer);
});
