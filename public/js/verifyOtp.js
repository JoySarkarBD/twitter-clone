const countdown = document.querySelector("#countdown");
const countTimer = document.querySelector("#countdown span");

let minutes = 1;
let seconds = 59;
console.log(seconds);
const timer = setInterval(() => {
  if (!(minutes === 0 && seconds === 0)) {
    seconds--;
  } else {
    clearInterval(timer);
    countdown.innerHTML = "OTP Expired";
    countdown.style.setProperty("color", "#f33838", "important");
  }

  if (seconds === 0) {
    if (!(minutes === 0 && seconds === 0)) {
      minutes = 0;
      seconds = 59;
    }
  }

  if (!(minutes === 0 && seconds === 0)) {
    countTimer.innerHTML =
      "0" +
      minutes +
      ":" +
      (seconds.toString().length === 1 ? "0" + seconds : seconds);
  }
}, 1000);
