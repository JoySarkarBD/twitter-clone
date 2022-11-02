// get elements
const getElement = (selector) => {
  return document.querySelector(selector);
};

// dom reference
const passIn = getElement("#password");
const passEyeIcon = getElement("#passEyeIcon");
const confirmPassIn = getElement("#confirmPassword");
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
showAndHidePass(passEyeIcon, passIn);
// confirm pass show and hide
showAndHidePass(confirmPassEyeIcon, confirmPassIn);

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
  if (passIn.value !== confirmPassIn.value) {
    pass_errors.hidden = false;
    pass_errors.textContent = "Password doesn't match.";
  } else {
    checkPass(passIn.value);
    pass_errors.hidden = false;
    pass_errors.textContent = "Password match.";
  }
};

// keypress event on password input field
let typingTimer;
const typingInterval = 500;

passIn.addEventListener("keyup", function () {
  clearTimeout(typingTimer);

  pass_errors.hidden = true;
  if (passIn.value) {
    typingTimer = setTimeout(() => checkPass(passIn.value), typingInterval);
  }
});

// keypress event on password input field
passIn.addEventListener("keydown", function () {
  clearTimeout(typingTimer);
});

confirmPassIn.addEventListener("keyup", function () {
  clearTimeout(typingTimer);
  pass_errors.hidden = true;

  if (confirmPassIn.value) {
    typingTimer = setTimeout(() => checkPass(), typingInterval);
  } else {
    return;
  }
});

// keydown event on confirm password input field
confirmPassIn.addEventListener("keydown", function () {
  clearTimeout(typingTimer);
});
