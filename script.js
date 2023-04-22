const timer = document.querySelector('.timer');
const startBtn = timer.querySelector('.start');
const stopBtn = timer.querySelector('.stop');
const resetBtn = timer.querySelector('.reset');
const hoursInput = timer.querySelector('#hours');
const minutesInput = timer.querySelector('#minutes');
const secondsInput = timer.querySelector('#seconds');
const hoursDisplay = timer.querySelector('.hours');
const minutesDisplay = timer.querySelector('.minutes');
const secondsDisplay = timer.querySelector('.seconds');
const decreaseFontSizeBtn = document.getElementById("decrease-font-size");
const increaseFontSizeBtn = document.getElementById("increase-font-size");
const display = document.getElementById("disp");
let fontSize = parseInt(window.getComputedStyle(display).fontSize);

let hours = 0;
let minutes = 0;
let seconds = 0;
let timerInterval;
let flashInterval;

decreaseFontSizeBtn.addEventListener("click", () => {
  if (fontSize > 10) {
    fontSize -= 3;
    display.style.fontSize = fontSize + "px";
  }
});

increaseFontSizeBtn.addEventListener("click", () => {
  if (fontSize < 100) {
    fontSize += 3;
    display.style.fontSize = fontSize + "px";
  }
});
function startTimer() {
  hours = parseInt(hoursInput.value);
  minutes = parseInt(minutesInput.value);
  seconds = parseInt(secondsInput.value);

  if (isNaN(hours)) {
    hours = 0;
  }

  if (isNaN(minutes)) {
    minutes = 0;
  }

  if (isNaN(seconds)) {
    seconds = 0;
  }

  hoursDisplay.textContent = padZero(hours);
  minutesDisplay.textContent = padZero(minutes);
  secondsDisplay.textContent = padZero(seconds);

  timerInterval = setInterval(function() {
    if (seconds == 0) {
      if (minutes == 0) {
        if (hours == 0) {
          clearInterval(timerInterval);
          startFlashing();
          return;
        }
        hours--;
        minutes = 59;
      } else {
        minutes--;
      }
      seconds = 59;
    } else {
      seconds--;
    }
    hoursDisplay.textContent = padZero(hours);
    minutesDisplay.textContent = padZero(minutes);
    secondsDisplay.textContent = padZero(seconds);
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  stopFlashing();
}

function resetTimer() {
  hours = 0;
  minutes = 0;
  seconds = 0;
  hoursDisplay.textContent = '00';
  minutesDisplay.textContent = '00';
  secondsDisplay.textContent = '00';
  hoursInput.value = '';
  minutesInput.value = '';
  secondsInput.value = '';
  clearInterval(timerInterval);
  stopFlashing();
}

function padZero(num) {
  return num.toString().padStart(2, '0');
}

function startFlashing() {
  flashInterval = setInterval(function() {
    document.body.classList.toggle('flash');
  }, 500);
}

function stopFlashing() {
  clearInterval(flashInterval);
  document.body.classList.remove('flash');
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
