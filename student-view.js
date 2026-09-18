import { setupBPMCollection } from "/bpm-collection.js";
import { setupDanceCollection } from "/dance-collection.js";
import { setupMoodCollection } from "/mood-collection.js";
import { setupLikeCollection } from "/like-collection.js";

let entryContainer = document.getElementById("entryContainer");

var enteredKeyCode = []

export function collectStudentID(){
    let inputContainer = document.createElement("div");

    let inputNumber = document.createElement("input");
    inputNumber.setAttribute("type", "number");

    let inputAdjective = document.createElement("input");
    inputAdjective.setAttribute("type", "text");

    let inputAnimal = document.createElement("input");
    inputAnimal.setAttribute("type", "text");

    let IDsubmitButton = document.createElement("button");
    IDsubmitButton.setAttribute("id", "IDsubmitButton");
    IDsubmitButton.innerHTML = "Hent eksisterende klasse";
    IDsubmitButton.addEventListener("click", () => {
        let code1 = inputNumber.value;
        let code2 = inputAdjective.value;
        let code3 = inputAnimal.value;
    
        enteredKeyCode = [code1, code2, code3];
        setupStudentView();
    })

    entryContainer.innerHTML = "";
    inputContainer.appendChild(inputNumber);
    inputContainer.appendChild(inputAdjective);
    inputContainer.appendChild(inputAnimal);
    inputContainer.appendChild(IDsubmitButton);

    entryContainer.appendChild(inputContainer);
}

export function setupStudentView(){
    let divContainer = document.createElement("div")

    let pageTitle = document.createElement("h2")
    pageTitle.innerText = "Velkommen til MiniFy"

    let pageSubtitle = document.createElement("p")
    pageSubtitle.innerText = "Undersøg data i musik ved at sætte tal på sange"

    let songIntroduction = document.createElement("p")
    songIntroduction.innerText = "Din lærer har valgt:"

    let songPresentation = document.createElement("h2")
    songPresentation.innerHTML = "<span id='activeSongTitle' class='activeSongElements'>Sang 1</span> af <span id='activeSongArtist' class='activeSongElements'>Kunstner 1</span>"

    let collectionIntroduction = document.createElement("p")
    collectionIntroduction.innerText = "Vælg noget data at indsamle"

    let bpmBtn = document.createElement("button")
    bpmBtn.classList.add("dataBtn")
    bpmBtn.innerText = "Saml tempo score"
    bpmBtn.addEventListener("click", () => {
        setupBPMCollection()
    })

    let danceBtn = document.createElement("button")
    danceBtn.classList.add("dataBtn")
    danceBtn.innerText = "Saml danse score"
    danceBtn.addEventListener("click", () => {
        setupDanceCollection()
    })

    let moodBtn = document.createElement("button")
    moodBtn.classList.add("dataBtn")
    moodBtn.innerText = "Saml humør score"
    moodBtn.addEventListener("click", () => {
        setupMoodCollection()
    })

    let popularityBtn = document.createElement("button")
    popularityBtn.classList.add("dataBtn")
    popularityBtn.innerText = "Saml popularitets score"
    popularityBtn.addEventListener("click", () => {
        setupLikeCollection()
    })

    let closeBtn = document.createElement("button")
    closeBtn.innerText = "Gå tilbage"

    entryContainer.innerHTML = "";
    divContainer.appendChild(pageTitle)
    divContainer.appendChild(pageSubtitle)
    divContainer.appendChild(songIntroduction)
    divContainer.appendChild(songPresentation)
    divContainer.appendChild(collectionIntroduction)
    divContainer.appendChild(bpmBtn)
    divContainer.appendChild(danceBtn)
    divContainer.appendChild(moodBtn)
    divContainer.appendChild(popularityBtn)
    divContainer.appendChild(closeBtn)

    entryContainer.appendChild(divContainer)
}