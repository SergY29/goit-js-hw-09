import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    start: document.querySelector('[data-start]'),
};

const defaultDate = new Date();
disabledButton()

// console.log(refs.start);

const options = {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        if ((defaultDate - selectedDates[0]) < 86400000) {
            enableButton();
        };
    },
    onChange(selectedDates) {
        if ((defaultDate - selectedDates[0]) > 86400000) {
            window.alert("Please choose a date in the future");
            disabledButton();
        }
    }
};
// console.log(defaultDate);

flatpickr("#datetime-picker", options);


function disabledButton() {
    refs.start.disabled = true;
}

function enableButton() {
    refs.start.disabled = false;
}
