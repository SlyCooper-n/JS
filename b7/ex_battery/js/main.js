// import { Moment } from "moment";
// JS modules test

const g = (el) => document.querySelector(el);
const gall = (el) => document.querySelectorAll(el);

const letters = gall(".letters div");
const input = g("input");
let inputValue = [];

window.addEventListener("keypress", filterKey);
input.addEventListener("keypress", filterKey);

function filterKey(event) {
    let key = event.key;
    letters.forEach((el) => {
        if (el.innerText == key.toUpperCase()) {
            el.style.borderColor = "yellow";
            el.style.color = "yellow";
            setTimeout(() => {
                el.style.borderColor = "#e5e7eb";
                el.style.color = "#e5e7eb";
            }, 500);

            if (event.target == input) {
                if (!inputValue.includes(`${key.toUpperCase()}`)) {
                    inputValue.push(key.toUpperCase());
                }
            }
            input.value = "";
            input.value = inputValue;
            return;
        }
    });
}
