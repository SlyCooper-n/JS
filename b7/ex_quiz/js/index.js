const g = (el) => document.querySelector(el);
const gall = (el) => document.querySelectorAll(el);

// INITIAL DATA
const question = g("#question"),
    progressBar = g("#progress-bar"),
    startBtn = g("#start"),
    results = g("#results"),
    tryAgainBtn = g("#try");

let answers = [],
    indexQuiz = 0,
    options,
    correct = 0;

// EVENTS
startBtn.addEventListener("click", startQuiz);

tryAgainBtn.addEventListener("click", resetQuiz);

// FUNCTIONS
function startQuiz() {
    startBtn.style.display = "none";

    renderOptions(indexQuiz);

    question.style.display = "block";
    g("section").style.display = "block";
}

function addClickEvent() {
    options.forEach((el) => {
        el.addEventListener("click", getAnswer);
    });
}

function getAnswer(e) {
    answers.push(
        Number(e.target.closest("div").querySelector("span").innerHTML) - 1
    );

    indexQuiz++;
    renderOptions(indexQuiz);
}

function renderOptions(index) {
    g("section").innerHTML = "";

    if (index == questions.length) {
        question.innerHTML = "";

        renderProgressBar(index);
        getResults();
        return;
    }

    question.innerHTML = `${questions[index].question}`;

    questions[index].options.forEach((el, i) => {
        g("section").innerHTML += `
        <div class="mb-2 p-2 bg-gray-800 rounded-md cursor-pointer transition hover:bg-opacity-60">
        <span
        class="option-number inline-flex justify-center items-center w-10 h-10 mr-2 text-center align-middle bg-gray-900 rounded-full"
                    >${i + 1}</span>
                    <p class="option inline-block">${el}</p>
                    </div>
                    `;
    });

    options = gall("section div");
    addClickEvent();

    renderProgressBar(index);
}

function renderProgressBar(num) {
    let percentage = (num / 10) * 100;

    progressBar.style.width = `${percentage}%`;
}

function getResults() {
    answers.forEach((el, i) => {
        if (Number(el) == questions[i].answer) {
            correct++;
        }
    });

    if (correct == questions.length) {
        results.querySelector("h2").innerHTML = `Wow!!! You're amazing`;
        results.querySelector("h3").innerHTML = `You got them all right`;
        results.querySelector("h3").style.color = `rgb(22, 163, 74)`;

        showResults();
        return;
    }
    if (correct >= questions.length / 2) {
        results.querySelector("h2").innerHTML = `You did a good job`;
        results.querySelector("h3").innerHTML = `You got ${
            (correct / 10) * 100
        }% right`;
        results.querySelector("h3").style.color = `rgb(22, 163, 74)`;

        showResults();
        return;
    }
    if (correct < questions.length / 2 && correct != 0) {
        results.querySelector(
            "h2"
        ).innerHTML = `Maybe you're unlucky. Try again`;
        results.querySelector("h3").innerHTML = `You got ${
            (correct / 10) * 100
        }% right`;
        results.querySelector("h3").style.color = `rgb(220, 38, 38)`;

        showResults();
        return;
    }

    results.querySelector(
        "h2"
    ).innerHTML = `Congrats!!! It's really rare to get this result but you did it!... Needs improvement -_-`;
    results.querySelector("h3").innerHTML = `You got them all wrong`;
    results.querySelector("h3").style.color = `rgb(220, 38, 38)`;

    showResults();
}

function showResults() {
    results.querySelector("p").innerHTML = `You got ${correct} out of 10 right`;

    results.style.display = "flex";
}

function resetQuiz() {
    results.style.display = "none";
    answers = [];
    correct = 0;
    indexQuiz = 0;
    renderOptions(indexQuiz);
}
