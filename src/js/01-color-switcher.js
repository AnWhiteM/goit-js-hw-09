function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let colorChangeInterval;

function startColorSwitching() {
  startButton.disabled = true;
  stopButton.disabled = false;

  colorChangeInterval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopColorSwitching() {
  startButton.disabled = false;
  stopButton.disabled = true;

  clearInterval(colorChangeInterval);
}

startButton.addEventListener('click', startColorSwitching);
stopButton.addEventListener('click', stopColorSwitching);
stopButton.disabled = true;
