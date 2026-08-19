const animals = ["hunde", "katte", "kaniner", "fugle", "fisk", "marsvin", "slanger", "frøer", "heste", "aber", "elefanter", "løver", "bjørne", "ulve", "ræve", "hjorte", "geder", "får"];    
const adjectives = ["glade", "sure", "triste", "våde", "tørre", "sultne", "mætte", "små", "store", "unge", "gamle", "venlige", "stille", "rene", "bløde"];

teacherBtn.addEventListener("click", () => {
    roleSelection.classList.toggle("hidden");
    teacherView.classList.toggle("hidden");
});

studentBtn.addEventListener("click", () => {
    roleSelection.classList.toggle("hidden");
    studentView.classList.toggle("hidden");
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

getClassID.addEventListener("click", () => {
    let code1 = getRandomInt(97)+2;
    let code2 = adjectives[getRandomInt(adjectives.length)];
    let code3 = animals[getRandomInt(animals.length)];
    let classID = code1 + "-" + code2 + "-" + code3;
    document.getElementById("constructID1").textContent = code1;
    document.getElementById("constructID2").textContent = code2;
    document.getElementById("constructID3").textContent = code3;
    document.getElementById("getClassIDView").classList.toggle("hidden");
    document.getElementById("teacherMainSelection").classList.toggle("hidden");
    uploadKeyCode(classID);
});

addNewSongBtn.addEventListener("click", () => {
    
    let songInputField = document.createElement("input");
    songInputField.type = "text";
    songInputField.placeholder = "Indtast sang navn";
    songInputField.className = "songInput";
    songInputField.classList.add("songInputfield");    
    songInputField.classList.add("classIDfieldBorder");

    let artistInputField = document.createElement("input");
    artistInputField.type = "text";
    artistInputField.placeholder = "Indtast kunstner navn";
    artistInputField.className = "songInput";
    artistInputField.classList.add("songInputfield");
    artistInputField.classList.add("classIDfieldBorder");

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Slet sang";
    deleteBtn.className = "deleteBtn";
    deleteBtn.classList.add("songInputfield");
    deleteBtn.addEventListener("click", () => {
        songInputField.remove();
        artistInputField.remove();
        deleteBtn.remove();
        activateBtn.remove();
        newLine.remove();
    });

    let activateBtn = document.createElement("button");
    activateBtn.textContent = "Aktivér sang";
    activateBtn.className = "active";
    activateBtn.classList.add("songInputfield");
    activateBtn.addEventListener("click", () => {
        songInputField.classList.toggle("active");
        songInputField.classList.toggle("classIDfieldBorder");
        artistInputField.classList.toggle("active");
        artistInputField.classList.toggle("classIDfieldBorder");
    });

    let newLine = document.createElement("br");

    document.getElementById("songList").appendChild(activateBtn);
    document.getElementById("songList").appendChild(songInputField);
    document.getElementById("songList").appendChild(artistInputField);
    document.getElementById("songList").appendChild(deleteBtn);
    document.getElementById("songList").appendChild(newLine);
})

inputClassID.addEventListener("click", () => {
    document.getElementById("inputClassIDView").classList.toggle("hidden");
    document.getElementById("teacherMainSelection").classList.toggle("hidden");
})