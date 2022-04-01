const g = (el) => document.querySelector(el);
const gall = (el) => document.querySelectorAll(el);

// INITIAL DATA
const screen = g(".container div"),
    divColors = gall(".color"),
    clearBtn = g("button");

let selectedColor = "black",
    baseColor,
    drawMode;
// ctx = screen.getContext("2d");

// EVENT
divColors.forEach((el) => {
    el.addEventListener("click", selectColor);
});

screen.addEventListener("mousemove", mouseMove);
screen.addEventListener("mousedown", mouseDown);
screen.addEventListener("mouseup", mouseUp);

clearBtn.addEventListener("click", clearCanvas);

// FUNCTIONS
function selectColor(e) {
    g(".color.active").classList.remove("active");
    e.target.classList.add("active");
    baseColor = e.target.getAttribute("data-color");

    switch (baseColor) {
        case "blue":
            selectedColor = "rgb(59 130 246)";
            break;
        case "green":
            selectedColor = "rgb(34 197 94)";
            break;
        case "yellow":
            selectedColor = "rgb(234 179 8)";
            break;
        case "red":
            selectedColor = "rgb(239 68 68)";
            break;
        default:
            selectedColor = "black";
            break;
    }
}

function mouseMove(e) {
    let coordX = e.offsetX;
    let coordY = e.offsetY;

    if (drawMode) {
        // draw(selectedColor, coordX, coordY);
    }
}
function mouseDown(e) {
    drawMode = true;
}
function mouseUp(e) {
    drawMode = false;
}

function draw(color, x, y) {
    // screen.innerHTML += `<div class="point" style="position: absolute; top:${y}px; left: ${x}px; background: ${selectedColor};"></div>`;
}

function clearCanvas() {
    // screen.innerHTML = "";
}
