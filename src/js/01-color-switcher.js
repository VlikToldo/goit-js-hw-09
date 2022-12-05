const refs = {
    btnStart: document.querySelector('[data-start]'),
    btnStop: document.querySelector('[data-stop]'),
    elBody: document.querySelector('body'),
};

let timerId = null;


refs.btnStart.addEventListener('click', onStartChangeColor);
refs.btnStop.addEventListener('click', onStopChangeColor);

function onStartChangeColor() {

    if (timerId === null) {
        timerId = setInterval(changeColor, 1000)
    };
    return;

}

function onStopChangeColor() {
    clearInterval(timerId);
    timerId = null;
}



function changeColor() {
    const color = getRandomHexColor();
    refs.elBody.style.backgroundColor = color;
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

