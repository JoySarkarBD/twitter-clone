/*TODO: username check functionality =======================================*/
let typeTimer;
const username = document.querySelector("#username");
const usermsg = document.querySelector("#userMsg");
usermsg.hidden = true;

username.addEventListener("keyup", function (e) {
  clearTimeout(typeTimer);

  if (username.value) {
    typeTimer = setTimeout(() => {
      fetch(`http://localhost:3000/checkuser/${username.value}`)
        .then(res => res.json())
        .then(data => {
          if (data.username) {
            usermsg.hidden = false;
            usermsg.textContent = `${data.username} already taken`;
            usermsg.style.color = "red";
          } else {
            usermsg.hidden = false;
            usermsg.textContent = `${username.value} is available`;
            usermsg.style.color = "green";
          }
        });
    }, 1000);
  } else {
    usermsg.hidden = true;
    usermsg.textContent = "";
  }
});

username.addEventListener("keydown", function (e) {
  clearTimeout(typeTimer);
});

/*TODO:  email check ============================================== */
const email = document.querySelector("#email");
const emailMsg = document.querySelector("#emailMsg");
emailMsg.hidden = true;

//checker functionality
email.addEventListener("keyup", function (e) {
  clearTimeout(typeTimer);
  if (email.value) {
    typeTimer = setTimeout(() => {
      const validMail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          email.value
        );
      if (validMail) {
        fetch(`http://localhost:3000/checkemail/${email.value}`)
          .then(res => res.json())
          .then(data => {
            if (data.email) {
              emailMsg.hidden = false;
              emailMsg.textContent = `Email already exist`;
              emailMsg.style.color = "red";
            } else {
              emailMsg.hidden = false;
              emailMsg.textContent = "Email Available";
              emailMsg.style.color = "green";
            }
          });
      } else {
        emailMsg.hidden = false;
        emailMsg.textContent = `Invalid Email`;
        emailMsg.style.color = "red";
      }
    }, 1000);
  } else {
    emailMsg.hidden = true;
    emailMsg.textContent = "";
  }
});

email.addEventListener("keydown", function (e) {
  clearTimeout(typeTimer);
});

//TODO:password===========================================================================
const passwordEyeIcon = document.querySelector("#passwordEyeIcon");
const passwordField = document.querySelector("#password");

//confirm password
const confirmpasswordField = document.querySelector("#confirmpassword");
const confirmPasswordEyeIcon = document.querySelector(
  "#confirmPasswordEyeIcon"
);

/* password hide & open function */
const passwordIconHandler = (handler, field) => {
  handler.addEventListener("click", function (e) {
    const i = this.querySelector("i");
    if (i.className === "fas fa-eye-slash") {
      i.className = "fas fa-eye";
      field.type = "text";
    } else {
      i.className = "fas fa-eye-slash";
      field.type = "password";
    }
  });
};

passwordIconHandler(passwordEyeIcon, passwordField);
passwordIconHandler(confirmPasswordEyeIcon, confirmpasswordField);

/* password validation section ==========================================*/
const passError = document.querySelector("#passError");
passError.hidden = true;

/* TODO:password validation check */
function validatePassword(p) {
  const errors = [];
  if (p.length < 8) {
    errors.push("8 characters");
  }
  if (p.search(/[a-z]/) < 0) {
    errors.push("one lower case");
  }
  if (p.search(/[A-Z]/) < 0) {
    errors.push("one upper case");
  }
  if (p.search(/[0-9]/) < 0) {
    errors.push("one digit.");
  }
  if (p.search(/[!@#\$%\^&\*_]/) < 0) {
    errors.push("One special char");
  }
  return errors;
}

//TODO: password check
function checkPassWord(password) {
  const errorResult = validatePassword(password);
  if (errorResult.length > 0) {
    const errMsg = errorResult.join(" , ");
    if (passError) {
      passError.hidden = false;
      passError.textContent = errMsg;
    } else {
      return;
    }
  }
}

passwordField.addEventListener("keyup", function (e) {
  clearTimeout(typeTimer);
  passError.hidden = true;

  if (passwordField.value) {
    typeTimer = setTimeout(() => {
      checkPassWord(passwordField.value);
    }, 500);
  } else {
  }
});

passwordField.addEventListener("keydown", function (e) {
  clearTimeout(typeTimer);
});

//TODO: confirm password check

function confirmPassCheck(password) {
  if (password) {
    if (password !== passwordField.value) {
      passError.hidden = false;
      passError.textContent = "Password doesn't match";
    } else {
      checkPassWord(passwordField.value);
    }
  }
}

confirmpasswordField.addEventListener("keyup", function (e) {
  clearTimeout(typeTimer);
  passError.hidden = true;

  if (confirmpasswordField.value) {
    typeTimer = setTimeout(() => {
      confirmPassCheck(confirmpasswordField.value);
    }, 500);
  } else {
  }
});

confirmpasswordField.addEventListener("keydown", function (e) {
  clearTimeout(typeTimer);
});
