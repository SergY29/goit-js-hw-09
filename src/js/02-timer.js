import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    start: document.querySelector('[data-start]'),
    inputTime: document.querySelector('#datetime-picker'),
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
        // console.log(selectedDates[0]);
        const value = (selectedDates[0] - defaultDate);
        if ((defaultDate - selectedDates[0]) < 86400000) {
            enableButton();
            localStorage.setItem(TIME, value);
        };
    },
    onChange(selectedDates) {
        if ((defaultDate - selectedDates[0]) > 86400000) {
            window.alert("Please choose a date in the future");
            disabledButton();
        }
    },
};

flatpickr(refs.inputTime, options);
disabledButton();

refs.start.addEventListener('click', start);

function start() {
    setInterval(() => {
        const referenceTime = localStorage.getItem(TIME);
        // convertMs(ms);
        console.log(referenceTime);
    }, 1000);
}

function disabledButton() {
    refs.start.disabled = true;
}

function enableButton() {
    refs.start.disabled = false;
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
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}