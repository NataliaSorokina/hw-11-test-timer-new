import './sass/main.scss';
import './js/elems.js';
import refs from './js/refs.js';
import Swal from 'sweetalert2';
// import Swal from 'sweetalert2/dist/sweetalert2.js';



// console.log(refs.field[0]);

// refs.field[0].insertAdjacentHTML('afterend', '<div class="timer-delimetr">:</div>');
// refs.field[1].insertAdjacentHTML('afterend', '<div class="timer-delimetr">:</div>');
// refs.field[2].insertAdjacentHTML('afterend', '<div class="timer-delimetr">:</div>');

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
  const currentDate = Date.now();
console.log(currentDate);
  if (selectedDate < currentDate) {
      // alert('Please choose a date in the future');
    // Swal.fire('Please choose a date in the future')
    Swal.fire(
  'Error',
  'Please choose a date in the future',
  'warning'
)
  } else {
    refs.btn.removeAttribute('disabled');
  }
}

function getRemainingTime() {
  refs.btn.setAttribute('disabled', true);
  refs.input.setAttribute('disabled', true);
  // const selectedDate = new Date(refs.input.value);
  const selectedDate = Date.parse(new Date(refs.input.value)) - (180 * 60 * 1000);
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
  const ds = refs.days.textContent = days;
  const hrs = refs.hours.textContent = hours;
  const mins = refs.minutes.textContent = minutes;
  const secs = refs.seconds.textContent = seconds;
  // console.log(`refs.days:refs.hours:refs.minutes:refs.seconds}`);
  // console.log(`${ds}:${hrs}:${mins}:${secs}`);
  // return `${ds}:${hrs}:${mins}:${secs}`;
  // return `${refs.days}:${refs.hours}:${refs.minutes}:${refs.seconds}`;
  
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

 function pad(value) {
    return String(value).padStart(2, '0');
  }

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); //{days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6, minutes: 42, seconds: 20}
