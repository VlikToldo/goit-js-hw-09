import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { convertMs } from './convertMs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let timerID = null;
let userDate = null;    

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
    },
  };

  const flatpickr = flatpickr('#datetime-picker', options);

  const refs = {
    input: document.querySelector('#datetime-picker'),
    button: document.querySelector('[data-start]'),
    secondsEL: document.querySelector('[data-seconds]'),
    minutesEL: document.querySelector('[data-minutes]'),
    hoursEl: document.querySelector('[data-hours]'),
    daysEl: document.querySelector('[data-days]'),
  };
  
  window.addEventListener('click', startTimer);

  function startTimer(e) {
    if (e.target.nodeName !== 'BUTTON') return;
    timerID = setInterval(countDownTimer, 1000);
    refs.button.disabled = true;
    refs.input.disabled = true;
  }
  
  function countDownTimer() {
    userDate = Date.parse(refs.input.value);
    const diff = userDate - Date.now();
    let { days, hours, minutes, seconds } = getTimeComponents(diff);
    if (userDate <= Date.now()) {
      Notify.info('Please, choose date in future');
      clearInterval(timerID);
      refs.input.disabled = false;
    }
    if (diff <= 1000) {
      clearInterval(timerID);
      seconds = getTimeComponents(0).seconds;
      minutes = getTimeComponents(0).minutes;
      hours = getTimeComponents(0).hours;
      days = getTimeComponents(0).days;
      refs.input.disabled = false;
    }
    updateCountDownUI({ seconds, minutes, hours, days });
  }
  
  function getTimeComponents(time) {
    return convertMs(time);
  }
  
  function updateCountDownUI({ seconds, minutes, hours, days }) {
    refs.secondsEL.textContent = seconds;
    refs.minutesEL.textContent = minutes;
    refs.hoursEl.textContent = hours;
    refs.daysEl.textContent = days;
  }





