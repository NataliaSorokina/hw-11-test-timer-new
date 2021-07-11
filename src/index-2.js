import './sass/main.scss';
import './js/elems.js';
import refs from './js/refs.js';
import Swal from 'sweetalert2';

refs.clearBtn = document.querySelector('[data-clear]'),
console.log(refs.clearBtn);
refs.startBtn.setAttribute('disabled', true);

refs.input.addEventListener('input', getSelectedDate);


const timer = {
    intervalId: null,
    isActive: false,

    // getSelectedDate();

    start() {
    // if (this.isActive) {
    //   return;
    // }    
    refs.startBtn.setAttribute('disabled', true);
    refs.input.setAttribute('disabled', true);
    const selectedDate = Date.parse(new Date(refs.input.value)) - (180 * 60 * 1000);
    console.log(selectedDate);
        
      this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            console.log(currentTime);
            const deltaTime = selectedDate - currentTime;
            console.log(deltaTime);
            const time = convertMs(deltaTime);
            // console.log(`${days}:${hours}:${mins}:${secs}`);
            console.log(time);
            
            updateClockface(time);
        }, 1000)
  },

  stop() {
    clearInterval(this.intervalId);
    // this.isActive = false;
    const time = convertMs(0);
    updateClockface(time);
    // refs.startBtn.removeAttribute('disabled', true);
    refs.input.value = '';
    refs.input.removeAttribute('disabled', true);
  }
}

refs.startBtn.addEventListener('click', () => {
  timer.start()
});
refs.clearBtn.addEventListener('click', () => {
  timer.stop()
});


function getSelectedDate() {
  const selectedDate = Date.parse(new Date(refs.input.value)) - (180 * 60 * 1000);
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
    refs.startBtn.removeAttribute('disabled');
  }
}

// function getRemainingTime() {
//   // const selectedDate = new Date(refs.input.value);
//   const selectedDate = Date.parse(new Date(refs.input.value)) - (180 * 60 * 1000);
//   console.log(selectedDate);
//   setInterval(() => {
//             const currentTime = Date.now();
//             console.log(currentTime);
//             const deltaTime = selectedDate - currentTime;
//             console.log(deltaTime);
//             const time = convertMs(deltaTime);
//             // console.log(`${days}:${hours}:${mins}:${secs}`);
//             console.log(time);
            
//             updateClockface(time);
//         }, 1000)
// }

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
