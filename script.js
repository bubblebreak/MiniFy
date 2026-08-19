import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getDatabase,
    ref,
    update,
    push,
    get
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDmvl9aaEtJ0GiWD8Oc6JN-3HGJaoB7vcs",
    authDomain: "minify-8c784.firebaseapp.com",
    databaseURL: "https://minify-8c784-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "minify-8c784",
    storageBucket: "minify-8c784.firebasestorage.app",
    messagingSenderId: "901925586359",
    appId: "1:901925586359:web:c794b4bf1d1ff8f6251432"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const input = [document.getElementById("bpmInput"), document.getElementById("danceInput"), document.getElementById("moodInput"), document.getElementById("preferenceInput")];
const inputType = ["BPM", "Dance", "Mood", "Preference"];
const animals = ["hunde", "katte", "kaniner", "fugle", "fisk", "marsvin", "slanger", "frøer", "heste", "aber", "elefanter", "løver", "bjørne", "ulve", "ræve", "hjorte", "geder", "får"];    
const adjectives = ["glade", "sure", "triste", "våde", "tørre", "sultne", "mætte", "små", "store", "unge", "gamle", "venlige", "stille", "rene", "bløde"];

const list = document.getElementById("numberList");

const roleSelection = document.getElementById("roleSelection");
const teacherBtn = document.getElementById("teacherBtn");
const studentBtn = document.getElementById("studentBtn");

const studentView = document.getElementById("studentView");
const teacherView = document.getElementById("teacherView");
const saveNewClassBtn = document.getElementById("saveNewClassBtn");
const submitClassID = document.getElementById("submitClassID");
const updateSongsBtn = document.getElementById("updateSongBtn")

const inputClassID = document.getElementById("inputClassID");
const getClassID = document.getElementById("getClassID");

const addNewSongBtn = document.getElementById("addNewSongBtn");

var classID = "";
var foundIDs = [];
var keyCodeID = "";
var songIDs = []
var songListString = "";
var activeSong = 0;
var enteredKeyCode = ""

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function createClassID(){
    let code1 = getRandomInt(97)+2;
    let code2 = adjectives[getRandomInt(adjectives.length)];
    let code3 = animals[getRandomInt(animals.length)];
    return [code1, code2, code3];
}

function addNewSong(id, songTitle, songArtist){
    let songInputField = document.createElement("input");
    songInputField.type = "text";
    songInputField.placeholder = "Indtast sang navn";
    songInputField.className = "songInput";
    songInputField.classList.add("songInputfield");    
    songInputField.classList.add("classIDfieldBorder");
    songInputField.classList.add("classIDfieldBorder");
    songInputField.setAttribute("id", "inputSong" + id)

    let artistInputField = document.createElement("input");
    artistInputField.type = "text";
    artistInputField.placeholder = "Indtast kunstner navn";
    artistInputField.className = "songInput";
    artistInputField.classList.add("songInputfield");
    artistInputField.classList.add("classIDfieldBorder");
    artistInputField.setAttribute("id", "inputArtist" + id)


    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Slet sang";
    deleteBtn.className = "deleteBtn";
    deleteBtn.classList.add("songInputfield");
    deleteBtn.addEventListener("click", () => {
        let indexFound = false;
        let songIndex = 0;
        while(!indexFound){
            if(songIDs[songIndex] === id){
                indexFound = true;
            }
            else {
                songIndex += 1;
            }
        }
        songIDs.splice(songIndex,1);
        if(activeSong == id){
            activeSong = 0
            updateActiveSong(0)
        }
        updateSongListHTML()
    });

    let activateBtn = document.createElement("button");
    activateBtn.textContent = "Aktivér sang";
    activateBtn.className = "active";
    activateBtn.classList.add("songInputfield");
    if(keyCodeID == ""){
        activateBtn.disabled = true
    }
    activateBtn.setAttribute("id", "activateBtn" + id)
    activateBtn.addEventListener("click", () => {
        activateSong(id)
    });

    let newLine = document.createElement("br");

    if(songTitle != ""){
        songInputField.value = songTitle;
        artistInputField.value = songArtist;
    }

    return [songInputField, artistInputField, deleteBtn, activateBtn, newLine]
}

function activateSong(id){
    songIDs.forEach(songID => {
        if(document.getElementById("inputSong" + songID).classList.contains("active")){
            document.getElementById("inputSong" + songID).classList.remove("active");
        }
        if(document.getElementById("inputArtist" + songID).classList.contains("active")){
            document.getElementById("inputArtist" + songID).classList.remove("active");
        }
        if(songID == id){
            console.log("hello")
            updateActiveSong(keyCodeID, id+1)
            //activeSong = id+1;
        }
    })
    document.getElementById("inputSong" + id).classList.add("active");
    document.getElementById("inputSong" + id).classList.add("classIDfieldBorder");
    document.getElementById("inputArtist" + id).classList.add("active");
    document.getElementById("inputArtist" + id).classList.add("classIDfieldBorder");
}

function updateSongListHTML(){
    updateActiveSong(keyCodeID, getActiveSongId())
    let songList = collectSongs()
    document.getElementById("songList").innerHTML = "";
    buildSongList(songList)
}

function collectSongs(){
    let songString = ""
    if(songIDs.length>0){
        songIDs.forEach(id => {
            let inputSong = document.getElementById("inputSong" + id).value
            let inputArtist = document.getElementById("inputArtist" + id).value
            let fullSong = inputSong + "__" + inputArtist + "##"
            songString += fullSong;
        })
    }
    return songString;
}

function buildSongList(songString){
    songIDs = []
    let foundSongs = songString.split("##")
    foundSongs.pop();
    for(let i=0; i<foundSongs.length; i++){
        songIDs.push(i);
        foundSongs[i] = foundSongs[i].split("__")
        let newSongComponents = addNewSong(i, foundSongs[i][0], foundSongs[i][1])
        document.getElementById("songList").appendChild(newSongComponents[3]);
        document.getElementById("songList").appendChild(newSongComponents[0]);
        document.getElementById("songList").appendChild(newSongComponents[1]);
        document.getElementById("songList").appendChild(newSongComponents[2]);
        document.getElementById("songList").appendChild(newSongComponents[4]);
        if(i == activeSong){
            console.log("Here")
            activateSong(i)
        }
    }   
}

function getActiveSongId(){
    for(let i=0; i<songIDs.length; i++){
        if(activeSong == songIDs[i]){
            return i+1
        }
    }
}

function createKeyCodeInput(role){
    let divContainer = document.createElement("div")

    let inputTitle = document.createElement("h2")
    inputTitle.innerText = "Indtast kodeord"

    let inputSubtitle = document.createElement("p")

    let verticalDiv = document.createElement("div")
    verticalDiv.classList.add("center-vertical")

    let horizontalDiv = document.createElement("div")
    horizontalDiv.classList.add("center-horizontal")

    let numberInput = document.createElement("input")
    numberInput.setAttribute("type", "number")
    numberInput.setAttribute("id", "inputID1")
    numberInput.setAttribute("placeholder", "Indtast tal")

    let adjectiveInput = document.createElement("input")
    adjectiveInput.setAttribute("type", "text")
    adjectiveInput.setAttribute("id", "inputID2")
    adjectiveInput.setAttribute("placeholder", "Indtast tillægsord")

    let animalInput = document.createElement("input")
    animalInput.setAttribute("type", "text")
    animalInput.setAttribute("id", "inputID3")
    animalInput.setAttribute("placeholder", "Indtast dyr")

    let breakElement1 = document.createElement("p")
    breakElement1.innerText = "-"
    breakElement1.classList.add("classIDfield")

    let breakElement2 = document.createElement("p")
    breakElement2.innerText = "-"
    breakElement2.classList.add("classIDfield")

    let submitButton = document.createElement("button")

    if(role >0){
        inputSubtitle.innerText = "Indtast kodeordet for din klasse."
        submitButton.innerText= "Deltag"
        submitButton.addEventListener("click", () => {
            readInput()
            setTimeout(() => {
                console.log(keyCodeID)
                if(keyCodeID != ""){
                    document.getElementById("pageContent").innerHTML = ""
                    setupStudentView()
                    let activeSongList = songListString.split("##")
                    let activeSongTitle = activeSongList[activeSong-1].split("__")[0]
                    let activeSongArtist = activeSongList[activeSong-1].split("__")[1]
                    document.getElementById("activeSongTitle").innerText = activeSongTitle
                    document.getElementById("activeSongArtist").innerText = activeSongArtist
                }
            }, 200);
            console.log("Student")
        })
    } else {
        inputSubtitle.innerText = "Indtast kodeordet for den klasse du vil tilføje sange til."
        submitButton.innerText= "Se aktivitets oversigt"
        submitButton.addEventListener("click", () => {
            readInput()
            setTimeout(() => {
                console.log(keyCodeID)
                console.log(songListString)
                if(keyCodeID != ""){
                    document.getElementById("pageContent").innerHTML = ""
                    setupTeacherView(true)
                    let keyCodeElements = enteredKeyCode.split("-")
                    document.getElementById("constructID1").innerText = keyCodeElements[0]
                    document.getElementById("constructID2").innerText = keyCodeElements[1]
                    document.getElementById("constructID3").innerText = keyCodeElements[2]
                    buildSongList(songListString)
                }
            }, 200);
            console.log("Teacher")
        })
    }

    divContainer.appendChild(inputTitle)
    divContainer.appendChild(inputSubtitle)
    divContainer.appendChild(verticalDiv)
    verticalDiv.appendChild(horizontalDiv)
    horizontalDiv.appendChild(numberInput)
    horizontalDiv.appendChild(breakElement1)
    horizontalDiv.appendChild(adjectiveInput)
    horizontalDiv.appendChild(breakElement2)
    horizontalDiv.appendChild(animalInput)
    divContainer.appendChild(submitButton)

    document.getElementById("pageContent").appendChild(divContainer)
}

function readInput(){
    let code1 = document.getElementById("inputID1").value;
    let code2 = document.getElementById("inputID2").value;
    let code3 = document.getElementById("inputID3").value;
    enteredKeyCode = code1 + "-" + code2 + "-" + code3;
    foundIDs.forEach(id => {
        if(id === enteredKeyCode){
            console.log("Yay")
            getKeyCodeID(enteredKeyCode);
        }
    })
}

function setupTeacherView(existingClass){
    let divContainer = document.createElement("div")

    let pageTitle = document.createElement("h2")

    let pageSubtitle = document.createElement("p")
    pageSubtitle.innerText = "Din klasse har fået dette kodeord:"

    let horisontalDiv = document.createElement("div")
    horisontalDiv.classList.add("center-horizontal")

    let verticalDiv = document.createElement("div")
    verticalDiv.classList.add("center-vertical")

    let keyCodeNumber = document.createElement("p")
    keyCodeNumber.classList.add("classIDfield")
    keyCodeNumber.classList.add("classIDfieldBorder")
    keyCodeNumber.setAttribute("id", "constructID1")
        
    let keyCodeAdjective = document.createElement("p")
    keyCodeAdjective.classList.add("classIDfield")
    keyCodeAdjective.classList.add("classIDfieldBorder")
    keyCodeAdjective.setAttribute("id", "constructID2")            

    let keyCodeAnimal = document.createElement("p")
    keyCodeAnimal.classList.add("classIDfield")
    keyCodeAnimal.classList.add("classIDfieldBorder")
    keyCodeAnimal.setAttribute("id", "constructID3")    

    let breakElement1 = document.createElement("p")
    breakElement1.innerText = "-"
    breakElement1.classList.add("classIDfield")

    let breakElement2 = document.createElement("p")
    breakElement2.innerText = "-"
    breakElement2.classList.add("classIDfield")

    let keywordDescription = document.createElement("p")
    keywordDescription.innerHTML = "Dette er din klasses kodeord. <span>Gem dette kodeord</span> så du kan bruge det senere."

    if(existingClass){
        pageTitle.innerText = "Velkommen tilbage"
    } else {
        pageTitle.innerText = "Velkommen til Minify"
    }

    divContainer.appendChild(pageTitle)
    if(!existingClass){
        divContainer.appendChild(pageSubtitle)
    }
    divContainer.appendChild(verticalDiv)
    verticalDiv.appendChild(horisontalDiv)
    horisontalDiv.appendChild(keyCodeNumber)
    horisontalDiv.appendChild(breakElement1)
    horisontalDiv.appendChild(keyCodeAdjective)
    horisontalDiv.appendChild(breakElement2)
    horisontalDiv.appendChild(keyCodeAnimal)
    divContainer.appendChild(keywordDescription)

    let songlistTitle = document.createElement("h2")
    songlistTitle.innerText = "Tilføj sange"

    let songlistDescription = document.createElement("p")
    songlistDescription.innerText = "Vælg hvilke sange I skal høre i undervisningstimen. Dette er hvad dine elever vil se. Du skal selv sætte sangene på via fx Spotify eller Youtube"

    let songlistContainer = document.createElement("div")
    songlistContainer.setAttribute("id", "songList")

    let newSongBtn = document.createElement("button")
    newSongBtn.innerText = "Tilføj en sang"
    newSongBtn.addEventListener("click", () => {
        let songID = songIDs.length
        songIDs.push(songID);

        let newSongComponents = addNewSong(songID, "", "")
        document.getElementById("songList").appendChild(newSongComponents[3]);
        document.getElementById("songList").appendChild(newSongComponents[0]);
        document.getElementById("songList").appendChild(newSongComponents[1]);
        document.getElementById("songList").appendChild(newSongComponents[2]);
        document.getElementById("songList").appendChild(newSongComponents[4]);
    })

    let updateBtn = document.createElement("button")
    updateBtn.innerText = "Update"
    updateBtn.addEventListener("click", () =>{
        let songString = collectSongs()
        updateSongListFB(keyCodeID, songString)
    })

    let saveAllBtn = document.createElement("button")
    saveAllBtn.innerText = "Gem klasse og sange"
    saveAllBtn.addEventListener("click", () => {
        let songString = collectSongs()
        document.getElementById("songList").innerHTML = ""
        roleSelection.classList.toggle("hidden");
        teacherView.classList.toggle("hidden");
        document.getElementById("getClassIDView").classList.toggle("hidden");
        document.getElementById("teacherMainSelection").classList.toggle("hidden");
        uploadKeyCode(classID, songString);
    })

    let closeBtn = document.createElement("button")
    closeBtn.innerText = "Gå tilbage"

    divContainer.appendChild(songlistTitle)
    divContainer.appendChild(songlistDescription)
    divContainer.appendChild(songlistContainer)
    divContainer.appendChild(newSongBtn)
    if(existingClass){
        divContainer.appendChild(updateBtn)
    } else {
        divContainer.appendChild(saveAllBtn)
    }
    divContainer.appendChild(closeBtn)

    document.getElementById("pageContent").appendChild(divContainer)
}

function setTeacherType(){
    let buttonContainer = document.createElement("div")
    buttonContainer.classList.add("center-vertical")
    buttonContainer.classList.add("full-height")

    let inputBtn = document.createElement("button")
    inputBtn.classList.add("roleBtn")
    inputBtn.innerText = "Brug en eksisterende klasse"
    inputBtn.addEventListener("click", () => {
        document.getElementById("pageContent").innerHTML = ""
        createKeyCodeInput(0)
    })

    let createBtn = document.createElement("button")
    createBtn.classList.add("roleBtn")
    createBtn.innerText = "Lav en ny klasse"
    createBtn.addEventListener("click", () => {
        let notUniqueID = true
        let codeElements = []
        let tempClassID = ""; 

        while(notUniqueID){
            codeElements = createClassID();
            tempClassID = codeElements[0] + "-" + codeElements[1] + "-" + codeElements[2];
            let unique = true
            foundIDs.forEach(id => {
                if(id === tempClassID){
                    unique = false
                }
            })
            if(unique){
                notUniqueID = false
            }
        }   
        enteredKeyCode = tempClassID;

        document.getElementById("pageContent").innerHTML = ""
        setupTeacherView(false)

        let keyCodeElements = enteredKeyCode.split("-")
        document.getElementById("constructID1").innerText = codeElements[0]
        document.getElementById("constructID2").innerText = codeElements[1]
        document.getElementById("constructID3").innerText = codeElements[2]
    })

    buttonContainer.appendChild(inputBtn)
    buttonContainer.appendChild(createBtn)
    document.getElementById("pageContent").appendChild(buttonContainer)

}

function setupStudentView(){
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

    let horisontalDiv = document.createElement("div")
    horisontalDiv.classList.add("center-horizontal")

    let verticalDiv = document.createElement("div")
    verticalDiv.classList.add("center-vertical")

    let bpmBtn = document.createElement("button")
    bpmBtn.classList.add("dataBtn")
    bpmBtn.innerText = "Saml tempo score"

    let danceBtn = document.createElement("button")
    danceBtn.classList.add("dataBtn")
    danceBtn.innerText = "Saml danse score"

    let moodBtn = document.createElement("button")
    moodBtn.classList.add("dataBtn")
    moodBtn.innerText = "Saml humør score"

    let popularityBtn = document.createElement("button")
    popularityBtn.classList.add("dataBtn")
    popularityBtn.innerText = "Saml popularitets score"

    let closeBtn = document.createElement("button")
    closeBtn.innerText = "Gå tilbage"

    divContainer.appendChild(pageTitle)
    divContainer.appendChild(pageSubtitle)
    divContainer.appendChild(songIntroduction)
    divContainer.appendChild(songPresentation)
    divContainer.appendChild(collectionIntroduction)
    divContainer.appendChild(horisontalDiv)
    horisontalDiv.appendChild(verticalDiv)
    verticalDiv.appendChild(bpmBtn)
    verticalDiv.appendChild(danceBtn)
    verticalDiv.appendChild(moodBtn)
    verticalDiv.appendChild(popularityBtn)
    divContainer.appendChild(closeBtn)

    document.getElementById("pageContent").appendChild(divContainer)
}

async function uploadKeyCode(code, songString) {
    const value = String(code);
    const chosenSongs = String(songString);
    await push(ref(db, "keyCodes"), {
        keyCode: value,
        timestamp: Date.now(),
        songs: chosenSongs,
        active: 0,
    });
}

async function loadKeyCodes() {
    const snapshot = await get(ref(db, "keyCodes"));
    if (!snapshot.exists()) {
        return;
    }

    let keyCodes = [];
    snapshot.forEach(child => {
        //let newEntry = []
        //newEntry.push(child.ref._path.pieces_[1])
        //newEntry.push(child.val().keyCode);
        keyCodes.push(child.val().keyCode)
    });
    foundIDs = keyCodes;
    return;
}   

async function getKeyCodeID(knownKeyCode) {
    const snapshot = await get(ref(db, "keyCodes"));
    if (!snapshot.exists()) {
        return;
    }
    let keyCodes = [];
    snapshot.forEach(child => {
        if(child.val().keyCode == knownKeyCode){
            keyCodeID = child.ref._path.pieces_[1]
            songListString = child.val().songs
            activeSong = child.val().active
        }
    });
    console.log(activeSong)
    return;
}

async function getActiveSong(knownKeyCode) {
    const keyCodeIdString = String(keyCodeID);
    const snapshot = await get(ref(db, "keyCodes/" +  keyCodeIdString));
    if (!snapshot.exists()) {
        return;
    }
    activeSong = snapshot.val().active
    return;
}

async function updateSongListFB(keyCode, songString) {
    const keyCodeIdString = String(keyCode);
    const userRef = ref(db, "keyCodes/" +  keyCodeIdString);

    await update(userRef, {
        songs: songString
    });
}

async function updateActiveSong(keyCode, activeSong) {
    const keyCodeIdString = String(keyCode);
    const userRef = ref(db, "keyCodes/" +  keyCodeIdString);

    await update(userRef, {
        active: activeSong
    });
}

teacherBtn.addEventListener("click", () => {
    loadKeyCodes()
    roleSelection.classList.toggle("hidden");
    setTeacherType()
});

studentBtn.addEventListener("click", () => {
    loadKeyCodes()
    roleSelection.classList.toggle("hidden");
    createKeyCodeInput(1)
    //studentView.classList.toggle("hidden");
});


