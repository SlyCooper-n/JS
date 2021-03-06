// import { Moment } from "moment";

const g = (el) => document.querySelector(el);
const gall = (el) => document.querySelectorAll(el);

const letters = gall(".letters div");
const input = g("input");
let inputValue = [];

window.addEventListener("keypress", filterKey);
input.addEventListener("keypress", (e) => {
    e.preventDefault();
    if (
        e.key == "q" ||
        e.key == "Q" ||
        e.key == "w" ||
        e.key == "W" ||
        e.key == "e" ||
        e.key == "E" ||
        e.key == "a" ||
        e.key == "A" ||
        e.key == "d" ||
        e.key == "D" ||
        e.key == "z" ||
        e.key == "Z" ||
        e.key == "x" ||
        e.key == "X" ||
        e.key == "c" ||
        e.key == "C" ||
        e.key == "s" ||
        e.key == "S" ||
        e.key == " "
    ) {
        input.value += e.key.toUpperCase();
    }
});
g("button").addEventListener("click", () => {
    let sounds = input.value.split("");
    playSong(sounds);
});

function filterKey(event) {
    let key = event.key;
    const respectiveAudio = g(`audio[data-keycode="${event.code}"]`);
    respectiveAudio.currentTime = 0;
    respectiveAudio.play();
    letters.forEach((el) => {
        if (el.innerText == key.toUpperCase()) {
            el.style.borderColor = "yellow";
            el.style.color = "yellow";
            setTimeout(() => {
                el.style.borderColor = "#e5e7eb";
                el.style.color = "#e5e7eb";
            }, 500);
            return;
        }
    });
}

function playSong(sounds) {
    let wait = 0;

    sounds.forEach((el) => {
        setTimeout(() => {
            g(`audio[data-keycode="Key${el}"]`).play();
        }, wait);

        wait += 250;
    });
}
