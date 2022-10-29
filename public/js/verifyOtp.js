const countdown = document.getElementById("countdown");
const timer = document.querySelector("#countdown span");

let min = 01;
let sec = 59;

const otpTimer = setInterval(() => {
  if (!((min === 0) & (sec === 0))) {
    sec--;
  } else {
    clearInterval(timer);
    countdown.innerHTML = "OTP ALREADY EXPIRED.....!";
    countdown.style.setProperty("color:", "#red", "important");
  }
  if (sec === 0) {
    if (!((min === 0) & (sec === 0))) {
      sec = 59;
      min = 00;
    }
  }
  if (sec === 0) {
    if (!((min === 0) & (sec === 0))) {
      sec = 59;
      min = 0;
    }
  }
  if (!((min === 0) & (sec === 0))) {
    timer.textContent =
      "0" + min + ":" + (sec.toString().length === 1 ? "0" + sec : sec);
  }
}, 1000);

document.addEventListener("resend-otp").onclick = () => {
  window.location.reload();
};
