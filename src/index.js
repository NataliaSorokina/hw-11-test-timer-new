import './sass/main.scss';


const refs = {
  input: document.querySelector('#date-selector'),
  btn: document.querySelector('button'),
  // timer: document.querySelector('.timer'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.btn.setAttribute('disabled', true);
refs.input.addEventListener('input', getSelectedDate);
refs.btn.addEventListener('click', getRemainingTime);

// const currentTime = Date.now();
// console.log(currentTime);
// const selectedDate = new Date(refs.input.value);
//  console.log(selectedDate);


function getSelectedDate() {
  const selectedDate = new Date(refs.input.value);
  console.log(selectedDate);
  const currentTime = Date.now();
console.log(currentTime);
  if (selectedDate < currentTime) {
      alert('Please choose a date in the future');
  } else {
    refs.btn.removeAttribute('disabled');
  }
}

function getRemainingTime() {
  const selectedDate = new Date(refs.input.value);
  console.log(selectedDate);
  setInterval(() => {
            const currentTime = Date.now();
            console.log(currentTime);
            const deltaTime = selectedDate - currentTime;
            console.log(deltaTime);
            const time = convertMs(deltaTime);
            // console.log(`${days}:${hours}:${mins}:${secs}`);
            console.log(time);
            
            updateClockface(time);
        }, 1000)
}

function updateClockface({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); //{days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6, minutes: 42, seconds: 20}
