const refs = {
    start: document.querySelector('[data-start]'),
    stop: document.querySelector('[data-stop]'),
    body: document.querySelector('body'),
}

let timerId = null;

refs.start.addEventListener('click', changeBkcolor);

refs.stop.addEventListener('click', () => {
    clearInterval(timerId);
    enableButton();
});




function changeBkcolor() {
    timerId = setInterval(() => {
        const hexColor = getRandomHexColor();
        refs.body.style.backgroundColor = hexColor;
    }, 1000);

    disabledButton();
};

function disabledButton() {
    refs.start.disabled = true;
}

function enableButton() {
    refs.start.disabled = false;
}


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}