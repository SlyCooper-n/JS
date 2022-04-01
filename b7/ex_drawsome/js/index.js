const g = (el) => document.querySelector(el);
const gall = (el) => document.querySelectorAll(el);

// INITIAL DATA
const screen = g("canvas"),
    divColors = gall(".color"),
    clearBtn = g("button"),
    container = g(".container");

let selectedColor = "black",
    baseColor,
    drawMode,
    coordX,
    coordY,
    ctx = screen.getContext("2d");

// EVENT
document.addEventListener("DOMContentLoaded", () => {
    let w = Array.from(getComputedStyle(container).width);

    let temp = w.indexOf("p");
    w.splice(temp, 2);

    w = Number(w.join(""));
    if (w > 1024) {
        w = 1024;
    }

    screen.width = w;
    screen.height = (w * 9) / 16;
});

divColors.forEach((el) => {
    el.addEventListener("click", selectColor);
});

screen.addEventListener("mousemove", mouseMove);
screen.addEventListener("mousedown", mouseDown);
screen.addEventListener("mouseup", mouseUp);

clearBtn.addEventListener("click", clearScreen);
// g(".download").addEventListener("click", downloadImage);

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
    if (drawMode) {
        draw(e.offsetX, e.offsetY);
    }
}
function mouseDown(e) {
    coordX = e.offsetX;
    coordY = e.offsetY;
    drawMode = true;
}
function mouseUp(e) {
    drawMode = false;
}

function draw(x, y) {
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.lineJoin = "round";
    ctx.moveTo(coordX, coordY);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.strokeStyle = selectedColor;
    ctx.stroke();

    coordX = x;
    coordY = y;
}

function clearScreen() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

// function downloadImage(e) {
//     e.preventDefault();
//     let link = screen.toDataURL("image/png");

//     g(".download").href = link;
//     g(".download").download = "canvas.png";
// }
