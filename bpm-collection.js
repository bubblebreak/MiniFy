import { setupStudentView } from "/student-view.js";

let entryContainer = document.getElementById("entryContainer");

let timeLeft = 30;
let count = 0;
let countdown;
let timerRunning = false;

export function setupBPMCollection() {
    let counter = document.createElement("h2");
    counter.innerHTML = "Antal slag: <span id='count'>0</span>"

    let countdownDisplay = document.createElement("div");
    countdownDisplay.id = "countdownDisplay";

    let progressBarContainer = document.createElement("div");
    progressBarContainer.id = "progressBarContainer";
    progressBarContainer.classList.add("progress-container");

    let progressBar = document.createElement("div");
    progressBar.id = "progressBar";
    progressBar.classList.add("progress-bar");

    progressBarContainer.appendChild(progressBar);

    let incrementButton = document.createElement("button");
    incrementButton.id = "incrementButton";
    incrementButton.textContent = "BAM";
    incrementButton.disabled = true;
    incrementButton.addEventListener("click", increaseCount);

    let startButton = document.createElement("button");
    startButton.id = "startButton";
    startButton.textContent = "Start";
    startButton.addEventListener("click", startCollection);

    let remainningTimeDisplay = document.createElement("p");
    remainningTimeDisplay.innerHTML = "Tid tilbage: <span id='remainingTime'>30</span> sekunder"

    let resultPopup = document.createElement("div");
    resultPopup.id = "resultPopup";
    resultPopup.style.display = "none";

    let resultCount = document.createElement("p");
    resultCount.id = "resultCount";

    let retryButton = document.createElement("button");
    retryButton.id = "retryButton";
    retryButton.textContent = "Prøv igen";
    retryButton.addEventListener("click", resetCollection);

    let saveButton = document.createElement("button");
    saveButton.id = "saveButton";
    saveButton.textContent = "Gem resultat";
    saveButton.addEventListener("click", () => {
        // Save the result to localStorage
        setupStudentView();
    })

    resultPopup.appendChild(resultCount);
    resultPopup.appendChild(retryButton);
    resultPopup.appendChild(saveButton);

    entryContainer.innerHTML = "";
    entryContainer.appendChild(counter);
    entryContainer.appendChild(countdownDisplay);
    entryContainer.appendChild(progressBarContainer);
    entryContainer.appendChild(remainningTimeDisplay);
    entryContainer.appendChild(incrementButton);
    entryContainer.appendChild(startButton);
    entryContainer.appendChild(saveButton); 

}

// Increase the counter
function increaseCount() {
    if (timerRunning) {
    count++;
    document.getElementById("count").textContent = count;
    }
}
// Increase using the Spacebar
document.addEventListener("keydown", (event) => {
    if (event.code === "Space" && timerRunning) {
    event.preventDefault();
    increaseCount();
    }
});

// Start the 30-second timer
function startTimer() {
    countdown = setInterval(() => {
    timeLeft--;

    document.getElementById("remainingTime").textContent = timeLeft;

    // Progress bar runs over 29 seconds
    const percentage = Math.max(0, ((timeLeft - 1) / 29) * 100);
    document.getElementById("progressBar").style.width = percentage + "%";

    // Timer finished
    if (timeLeft <= 0) {
        clearInterval(countdown);
        timerRunning = false;
        document.getElementById("incrementButton").disabled = true;
        //document.getElementById("retryButton").hidden = false;
        document.getElementById("resultPopup").style.display = "block";
    }
    }, 1000);
}

function startCollection(){
    document.getElementById("startButton").disabled = true;
    //document.getElementById("retryButton").hidden = true;
    document.getElementById("incrementButton").disabled = true;

    let countdownNumber = 3;

    document.getElementById("countdownDisplay").textContent = countdownNumber;

    const preGameCountdown = setInterval(() => {
        countdownNumber--;

        if (countdownNumber > 0) {
        document.getElementById("countdownDisplay").textContent = countdownNumber;

        // Start progress bar when "1" appears
        if (countdownNumber === 1) {
            timeLeft = 30;
            document.getElementById("progressBar").style.width = "100%";
            startTimer();
        }

        } else {
        clearInterval(preGameCountdown);
        document.getElementById("countdownDisplay").textContent = "";

        // Enable button
        timerRunning = true;
        document.getElementById("incrementButton").disabled = false;
        }
    }, 1000); 
}

function resetCollection() {
    clearInterval(countdown);

    timeLeft = 30;
    count = 0;
    timerRunning = false;

    document.getElementById("count").textContent = count;
    document.getElementById("progressBar").style.width = "100%";

    document.getElementById("startButton").disabled = false;
    document.getElementById("incrementButton").disabled = true;
    document.getElementById("retryButton").hidden = true;
    document.getElementById("countdownDisplay").textContent = "";
}
