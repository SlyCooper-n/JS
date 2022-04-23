const g = (el) => document.querySelector(el);
const gall = (el) => document.querySelectorAll(el);

// INITAL DATA
const mainDiv = g(".container div"),
    blocks = gall(".container div div.cursor-grab"),
    areas = gall(".area div");

let block,
    areasObj = {
        a: null,
        b: null,
        c: null,
    };
// EVENTS
mainDiv.addEventListener("dragover", dragOver);
mainDiv.addEventListener("dragleave", dragLeave);
mainDiv.addEventListener("drop", drop);

blocks.forEach((el) => {
    el.addEventListener("dragstart", dragStart);
    el.addEventListener("dragend", dragEnd);
    el.addEventListener("touchstart", dragStart);
    el.addEventListener("touchend", dragEnd);
});

areas.forEach((el) => {
    el.addEventListener("dragover", dragOver);
    el.addEventListener("dragleave", dragLeave);
    el.addEventListener("drop", drop);
});

// FUNCTIONS
function dragStart(e) {
    block = e.currentTarget;
    block.classList.add("dragging");
}

function dragEnd(e) {
    e.currentTarget.classList.remove("dragging");
}

function dragOver(e) {
    if (e.currentTarget.querySelector("div") && e.currentTarget != mainDiv) {
        return;
    }

    e.preventDefault();
    e.currentTarget.style.background = "rgba(71, 85, 105, 0.5)";
}
function dragLeave(e) {
    e.currentTarget.style.background = "";
}
function drop(e) {
    e.currentTarget.style.background = "";

    e.currentTarget.appendChild(block);

    analyzeOrder();
}

function analyzeOrder() {
    areas.forEach((el) => {
        let child = el.querySelector("div");
        let areaID = el.getAttribute("id");

        if (!child) {
            areasObj[areaID] = null;
            return;
        }

        if (child.getAttribute("data-order") == el.getAttribute("data-area")) {
            areasObj[areaID] = true;
            return;
        }
    });

    if (areasObj.a && areasObj.b && areasObj.c) {
        g(".area").classList.add("correct");
        return;
    }

    g(".area").classList.remove("correct");
}
