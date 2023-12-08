import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      Notiflix.Report.failure(
        'Error',
        'Please choose a date in the future',
        'OK'
      );
      document.querySelector('[data-start]').disabled = true;
    } else {
      document.querySelector('[data-start]').disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

function startCountdown(endDate) {
  const intervalId = setInterval(() => {
    const now = new Date().getTime();
    const difference = endDate - now;

    if (difference <= 0) {
      clearInterval(intervalId);
      Notiflix.Report.success('Success', 'Countdown has ended!', 'OK');
    } else {
      const { days, hours, minutes, seconds } = convertMs(difference);
      updateTimer(days, hours, minutes, seconds);
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function updateTimer(days, hours, minutes, seconds) {
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent = addLeadingZero(
    minutes
  );
  document.querySelector('[data-seconds]').textContent = addLeadingZero(
    seconds
  );
}

document.querySelector('[data-start]').addEventListener('click', () => {
  const selectedDate = flatpickr.parseDate(
    document.getElementById('datetime-picker').value
  );

  if (selectedDate < new Date()) {
    Notiflix.Report.failure(
      'Error',
      'Please choose a date in the future',
      'OK'
    );
  } else {
    startCountdown(selectedDate);
    document.querySelector('[data-start]').disabled = true;
  }
});
