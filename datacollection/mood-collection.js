import { setupStudentView } from "/student-view.js";

let entryContainer = document.getElementById("entryContainer");

export function setupMoodCollection() {
    let moodInputContainer = document.createElement("div");

    let moodOutput = document.createElement("div");

    let moodValueDisplay = document.createElement("p");

    let moodInput = document.createElement("input");
    moodInput.setAttribute("id", "moodInput");
    moodInput.setAttribute("type", "range");
    moodInput.setAttribute("min", "1");
    moodInput.setAttribute("max", "100");
    moodInput.setAttribute("value", "50");
    moodInput.addEventListener("input", () => {
        let moodValue = moodInput.value;
        moodValueDisplay.textContent = `Humørværdi: ${moodValue}`;
    });

    let moodSubmitButton = document.createElement("button");
    moodSubmitButton.setAttribute("id", "moodSubmitButton");
    moodSubmitButton.innerHTML = "Gem humør score";
    moodSubmitButton.addEventListener("click", () => {
        let moodValue = moodInput.value;
        console.log("Indsendt humørværdi:", moodValue);
        // Save the result to localStorage
        setupStudentView();
    });

    entryContainer.innerHTML = "";
    moodInputContainer.appendChild(moodInput);
    moodInputContainer.appendChild(moodOutput);
    moodInputContainer.appendChild(moodSubmitButton);
    moodInputContainer.appendChild(moodValueDisplay);

    entryContainer.appendChild(moodInputContainer);
}