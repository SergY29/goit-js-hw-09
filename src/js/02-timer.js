import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    start: document.querySelector('[data-start]'),
};

// console.log(refs.start);

const options = {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);

    },
    onChange(selectedDates) {
        window.alert("Please choose a date in the future");
    }

};


flatpickr("#datetime-picker", options);

