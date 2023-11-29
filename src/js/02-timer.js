import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const datetimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
startButton.setAttribute('disabled', true);

const elDay = document.querySelector('[data-days]');
const elHours = document.querySelector('[data-hours]');
const elMinutes = document.querySelector('[data-minutes]');
const elSeconds = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      //   window.alert('Please choose a date in the future');
    } else {
      startButton.removeAttribute('disabled');
    }
  },
};

flatpickr('#datetime-picker', options);

function updateTimer() {
  const targetDate = new Date(datetimePicker.value);
  const currentTime = new Date();
  const differenceTime = targetDate - currentTime;
  if (differenceTime < 0) {
    return;
  }
  const { days, hours, minutes, seconds } = convertMs(differenceTime);
  elDay.textContent = addLeadingZero(days);
  elHours.textContent = addLeadingZero(hours);
  elMinutes.textContent = addLeadingZero(minutes);
  elSeconds.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  value = parseInt(value);

  return value.toString().padStart(2, '0');
}

startButton.addEventListener('click', () => {
  setInterval(() => {
    updateTimer();
  }, 1000);
});
