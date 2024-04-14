import { addZero } from './helperFunction.js';
import { MONTH_NAMES } from './constants.js';

const hourHand = document.querySelector('.clock-face__hour-hand');
const minuteHand = document.querySelector('.clock-face__minute-hand');
const numberWrappers = document.querySelectorAll('.time__number-wrapper');
const date = document.querySelector('.date');

let hoursFirstNumbers = document.querySelectorAll('.time__hours-first-number');
let hoursLastNumbers = document.querySelectorAll('.time__hours-last-number');
let minutesFirstNumbers = document.querySelectorAll('.time__minutes-first-number');
let minutesLastNumbers = document.querySelectorAll('.time__minutes-last-number');
let secondsFirstNumbers = document.querySelectorAll('.time__seconds-first-number');
let secondsLastNumbers = document.querySelectorAll('.time__seconds-last-number');

let currentDate;
let hours;
let minutes;
let seconds;
let clockHours;
let clockMinutes;
let clockSeconds;

function getTimeAndDate() {
  currentDate = new Date();
  hours = String(addZero(currentDate.getHours()));
  minutes = String(addZero(currentDate.getMinutes()));
  seconds = String(addZero(currentDate.getSeconds()));

  currentDate.setSeconds(currentDate.getSeconds() + 1);

  clockHours = String(addZero(currentDate.getHours()));
  clockMinutes = String(addZero(currentDate.getMinutes()));
  clockSeconds = String(addZero(currentDate.getSeconds()));
}

getTimeAndDate();

function setHands() {
  hourHand.style.transform = `
    translateX(-50%)
    rotate(${(hours * 30) + (minutes * 0.5) + (seconds * 0.5 / 60)}deg)
  `;
  
  minuteHand.style.transform = `
    translateX(-50%)
    rotate(${(minutes * 6) + (seconds * 0.1)}deg)
  `;
}

setHands();

function initTime(numbers, clockTime, time) {
  numbers[0].textContent = clockTime[0];
  numbers[1].textContent = time[0];
}

initTime(hoursFirstNumbers, clockHours[0], hours[0]);
initTime(hoursLastNumbers, clockHours[1], hours[1]);
initTime(minutesFirstNumbers, clockMinutes[0], minutes[0]);
initTime(minutesLastNumbers, clockMinutes[1], minutes[1]);
initTime(secondsFirstNumbers, clockSeconds[0], seconds[0]);
initTime(secondsLastNumbers, clockSeconds[1], seconds[1]);

function addAnimation(numbers) {
  numbers[0].classList.add('move-next-num');
  numbers[1].classList.add('move-current-num');
}

if (
  clockHours[0] > hours[0] ||
  (clockHours[0] === '0' && hours[0] === '2')
) {
  addAnimation(hoursFirstNumbers);
}

if (
  clockHours[1] > hours[1] ||
  (clockHours[1] === '0' && hours[1] === '9') ||
  (clockHours[1] === '0' && hours[1] === '3')
) {
  addAnimation(hoursLastNumbers);
}

if (
  clockMinutes[0] > minutes[0] ||
  (clockMinutes[0] === '0' && minutes[0] === '5')
) {
  addAnimation(minutesFirstNumbers);
}

if (
  clockMinutes[1] > minutes[1] ||
  (clockMinutes[1] === '0' && minutes[1] === '9')
) {
  addAnimation(minutesLastNumbers);
}

if (
  clockSeconds[0] > seconds[0] ||
  (clockSeconds[0] === '0' && seconds[0] === '5')
) {
  addAnimation(secondsFirstNumbers);
}

function setCurrentDate() {
  date.textContent = `
    ${currentDate.getDate()}
    ${MONTH_NAMES[currentDate.getMonth()]},
    ${currentDate.getFullYear()}
  `;
}

setCurrentDate();

function updateTimeNum(newNum, classStr, clockTime, numbers, timeNum) {
  newNum.className = classStr + ' time__number move-next-num';
  newNum.textContent = clockTime;
  numbers[1].remove();
  numberWrappers[timeNum].insertAdjacentElement('afterbegin', newNum);
  numbers[0].classList.remove('move-next-num');
  numbers[0].classList.add('move-current-num');
  return document.querySelectorAll('.' + classStr);
}

setInterval(() => {
  getTimeAndDate();
  setHands();

  if (
    clockSeconds[1] > seconds[1] ||
    (clockSeconds[1] === '0' && seconds[1] === '9')
  ) {
    const newSecondsLastNum = document.createElement('span');

    secondsLastNumbers = updateTimeNum(
      newSecondsLastNum, 'time__seconds-last-number', clockSeconds[1], secondsLastNumbers, 5
    );
  }

  if (
    clockSeconds[0] > seconds[0] ||
    (clockSeconds[0] === '0' && seconds[0] === '5')
  ) {
    const newSecondsFirstNum = document.createElement('span');

    secondsFirstNumbers = updateTimeNum(
      newSecondsFirstNum, 'time__seconds-first-number', clockSeconds[0], secondsFirstNumbers, 4
    );
  } else {
    secondsFirstNumbers[0].textContent = clockSeconds[0];
  }

  if (
    clockMinutes[1] > minutes[1] ||
    (clockMinutes[1] === '0' && minutes[1] === '9')
  ) {
    const newMinutesLastNum = document.createElement('span');

    minutesLastNumbers = updateTimeNum(
      newMinutesLastNum, 'time__minutes-last-number', clockMinutes[1], minutesLastNumbers, 3
    );
  } else {
    minutesLastNumbers[0].textContent = clockMinutes[1];
  }

  if (
    clockMinutes[0] > minutes[0] ||
    (clockMinutes[0] === '0' && minutes[0] === '5')
  ) {
    const newMinutesFirstNum = document.createElement('span');

    minutesFirstNumbers = updateTimeNum(
      newMinutesFirstNum, 'time__minutes-first-number', clockMinutes[0], minutesFirstNumbers, 2
    );
  } else {
    minutesFirstNumbers[0].textContent = clockMinutes[0];
  }

  if (
    clockHours[1] > hours[1] ||
    (clockHours[1] === '0' && hours[1] === '9') ||
    (clockHours[1] === '0' && hours[1] === '3')
  ) {
    const newHoursLastNum = document.createElement('span');

    hoursLastNumbers = updateTimeNum(
      newHoursLastNum, 'time__hours-last-number', clockHours[1], hoursLastNumbers, 1
    );
  } else {
    hoursLastNumbers[0].textContent = clockHours[1];
  }

  const dateChange = clockHours[0] === '0' && hours[0] === '2';

  if (clockHours[0] > hours[0] || dateChange) {
    const newHoursFirstNum = document.createElement('span');

    hoursFirstNumbers = updateTimeNum(
      newHoursFirstNum, 'time__hours-first-number', clockHours[0], hoursFirstNumbers, 0
    );

    if (dateChange) {
      setTimeout(() => { setCurrentDate(); }, 1000);
    }
  } else {
    hoursFirstNumbers[0].textContent = clockHours[0];
    
    if (dateChange) {
      setTimeout(() => { setCurrentDate(); }, 1000);
    }
  }
}, 1000);
