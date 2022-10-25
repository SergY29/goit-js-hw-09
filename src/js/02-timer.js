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

flatpickr(refs.inputTime, options);
disabledButton();

refs.start.addEventListener('click', start);

function start() {
    let referenceTime = localStorage.getItem(TIME);

    setInterval(() => {
        const currentTime = Date.now();
        const delta = referenceTime - currentTime;

        const timer = convertMs(delta);
        console.log(timer);
    }, 1000);
};

function disabledButton() {
    refs.start.disabled = true;
};

function enableButton() {
    refs.start.disabled = false;
};

function windowAlert() {
    window.alert("Please choose a date in the future");
};

function setTimeLocalStorage(title, value) {
    localStorage.setItem(title, value);
};

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
};
