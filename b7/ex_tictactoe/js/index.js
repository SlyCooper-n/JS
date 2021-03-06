const g = (el) => document.querySelector(el);
const gall = (el) => document.querySelectorAll(el);

// Inital data
let boxesObj = {
    a1: "",
    b1: "",
    c1: "",
    a2: "",
    b2: "",
    c2: "",
    a3: "",
    b3: "",
    c3: "",
};

let turn = sortTurn(),
    playing = true,
    whoWin,
    lastChange;

const turnText = g(".turn p"),
    winner = g(".winner p"),
    boxes = gall(".smaller-box"),
    resetBtn = g(".reset");

reset();

// Events
boxes.forEach((el) => {
    el.addEventListener("click", itemClick);
});

g(".btns button").addEventListener("click", undo);
resetBtn.addEventListener("click", reset);

// Functions
function sortTurn() {
    let num = Math.floor(Math.random() * 2);
    let turn;

    switch (num) {
        case 0:
            turn = "X";
            break;

        case 1:
            turn = "O";
            break;
    }

    return turn;
}

function itemClick(e) {
    let x = e.target.getAttribute("data-item");
    if (boxesObj[x] != "" || playing == false) {
        return;
    }
    boxesObj[x] = turn;
    lastChange = x;

    turn == "X" ? (turn = "O") : (turn = "X");
    turnText.innerHTML = turn;
    g(".btns button").removeAttribute("disabled");
    renderBoxes();
}

function renderBoxes() {
    for (let i in boxesObj) {
        g(`div[data-item=${i}`).innerHTML = boxesObj[i];
    }

    checkgame();
}

function undo() {
    if (boxesObj[lastChange] == "" || !playing) {
        return;
    }
    turn == "X" ? (turn = "O") : (turn = "X");
    turnText.innerHTML = turn;
    boxesObj[lastChange] = "";
    g(".btns button").setAttribute("disabled", true);
    renderBoxes();
}

function reset() {
    for (let i in boxesObj) {
        boxesObj[i] = "";
    }

    renderBoxes();
    turn = sortTurn();
    turnText.innerHTML = turn;
    whoWin = "";
    winner.innerHTML = whoWin;
    playing = true;
}

function checkgame() {
    if (checkForWinner()) {
        winner.innerHTML = `${whoWin} has won`;
        playing = false;
        g(".btns button").setAttribute("disabled", true);
        return;
    }
    if (isFull()) {
        winner.innerHTML = "The table is full, nobody won";
        playing = false;
        g(".btns button").setAttribute("disabled", true);
        return;
    }
    playing = true;
}

function checkForWinner() {
    let waysToWin = [
        "a1,b1,c1",
        "a2,b2,c2",
        "a3,b3,c3",
        "a1,a2,a3",
        "b1,b2,b3",
        "c1,c2,c3",
        "a1,b2,c3",
        "a3,b2,c1",
    ];

    waysToWin.forEach((el) => {
        let check = el.split(",");
        let everyX = check.every((option) => boxesObj[option] == "X");
        let everyO = check.every((option) => boxesObj[option] == "O");

        if (everyX) {
            whoWin = "X";
        }
        if (everyO) {
            whoWin = "O";
        }
    });

    if (whoWin == "X" || whoWin == "O") {
        return true;
    }
}

function isFull() {
    for (i in boxesObj) {
        if (boxesObj[i] != "") {
            continue;
        }
        return false;
    }
    return true;
}
