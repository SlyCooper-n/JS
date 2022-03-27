const g = (el) => document.querySelector(el);
const gall = (el) => document.querySelectorAll(el);

const digitalClock = g(".dg-clock");

setInterval(() => {
    let date = new Date();
    updateClocks(date);
}, 1000);
updateClock(date);

function updateClocks(date) {
    let sec = date.getSeconds(),
        min = date.getMinutes(),
        hours = date.getHours(),
        x = findDeg(sec),
        y = findDeg(min),
        z = findHourDeg(hours);

    digitalClock.innerHTML = `${addZero(hours)} : ${addZero(min)} : ${addZero(
        sec
    )}`;

    g("#sec").style.transform = `rotate(calc(${sec} * 6deg)) translateX(${x}%)`;
    g("#min").style.transform = `rotate(calc(${min} * 6deg)) translateX(${y}%)`;
    g(
        "#hour"
    ).style.transform = `rotate(calc(${hours} * 30deg)) translateX(${z}%)`;
}

function addZero(el) {
    if (Number(el) < 10) {
        return "0" + el;
    } else {
        return el;
    }
}

function findDeg(num) {
    let y;
    if (num <= 30) {
        y = 50 - num * 3.3333333;
        return Math.floor(y);
    }
    if (num > 30) {
        y = (num - 30) * 3.3333333 - 50;
        return Math.ceil(y);
    }
}

function findHourDeg(x) {
    if (x >= 12) {
        x -= 12;
    }
    if (x <= 6) {
        return Math.floor(50 - x * 16.6666666);
    }
    if (x > 6 && x < 12) {
        return Math.ceil((x - 6) * 16.6666666 - 50);
    }
}
