import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    start: document.querySelector('[data-start]'),
    inputTime: document.querySelector('#datetime-picker'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
    timer: document.querySelector('.timer'),
    label: document.querySelectorAll('.label'),
    field: document.querySelectorAll('.field'),
    valueTimer: document.querySelectorAll('.value'),
};


const defaultDate = Date.now();
const TIME = "time";
const options = {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    time_24hr: true,
    defaultDate: Date.now(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if ((defaultDate - selectedDates[0]) < 0) {
            const data = ((selectedDates[0] - defaultDate) + defaultDate);
            setTimeLocalStorage(TIME, data);
            enableButton();
        };
    },
    onChange(selectedDates) {
        if ((defaultDate - selectedDates[0]) > 0) {
            windowAlert();
            disabledButton();
        }
    },
};
const timer = {
    isActive: false,

    start() {

        if (this.isActive) {
            return;
        };

        disabledButton();
        let referenceTime = localStorage.getItem(TIME);
        this.isActive = true;

        setInterval(() => {
            const currentTime = Date.now();
            const delta = referenceTime - currentTime;
            const time = convertMs(delta);
            if (delta > 0) {
                updateClock(time);
            } else {
                this.isActive = false;
                enableButton();
                return;
            }
        }, 1000);
    },
};



flatpickr(refs.inputTime, options);
disabledButton();
style();

refs.start.addEventListener('click', timer.start);

function updateClock({ days, hours, minutes, seconds }) {
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.minutes.textContent = `${minutes}`;
    refs.seconds.textContent = `${seconds}`;
};

function disabledButton() {
    refs.start.disabled = true;
};

function enableButton() {
    refs.start.disabled = false;
};

function windowAlert() {
    // window.alert("Please choose a date in the future");
    Notiflix.Notify.warning('Please choose a date in the future');
};

function setTimeLocalStorage(title, value) {
    localStorage.setItem(title, value);
};

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
};


function style() {
    refs.timer.style.display = 'flex';

    refs.valueTimer.forEach(valueTimer => {
        valueTimer.style.fontSize = '50px';
    });

    refs.label.forEach(label => {
        label.style.fontSize = '20px';
        label.style.display = 'flex';
    });

    refs.field.forEach(field => {
        field.style.marginLeft = '20px';
    });
}; 