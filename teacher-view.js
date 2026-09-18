let entryContainer = document.getElementById("entryContainer");
const animals = ["hunde", "katte", "kaniner", "fugle", "fisk", "marsvin", "slanger", "frøer", "heste", "aber", "elefanter", "løver", "bjørne", "ulve", "ræve", "hjorte", "geder", "får"];    
const adjectives = ["glade", "sure", "triste", "våde", "tørre", "sultne", "mætte", "små", "store", "unge", "gamle", "venlige", "stille", "rene", "bløde"];
var classID = "";
var foundIDs = [];
var keyCodeID = "";
var songIDs = []
var activeSong = 0;
var enteredKeyCode = []



export function setTeacherType() {
    let newIDbutton = document.createElement("button");
    newIDbutton.setAttribute("id", "newIDbutton");
    newIDbutton.innerHTML = "Opret ny klasse";
    newIDbutton.addEventListener("click", () => {
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
        enteredKeyCode = codeElements;
        setupTeacherView(false);
    })

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
    
        if(checkIDinput(code1, code2, code3)){
            enteredKeyCode = [code1, code2, code3];
            setupTeacherView(true);
        }
    })

    entryContainer.innerHTML = "";
    entryContainer.appendChild(newIDbutton);
    inputContainer.appendChild(inputNumber);
    inputContainer.appendChild(inputAdjective);
    inputContainer.appendChild(inputAnimal);
    inputContainer.appendChild(IDsubmitButton);

    entryContainer.appendChild(inputContainer);
}

function checkIDinput(code1, code2, code3){
    enteredKeyCode = code1 + "-" + code2 + "-" + code3;
    foundIDs.forEach(id => {
        if(id === enteredKeyCode){
            console.log("Yay")
            //getKeyCodeID(enteredKeyCode);
            return true;
        }
    })
    return false;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function createClassID(){
    let code1 = getRandomInt(97)+2;
    let code2 = adjectives[getRandomInt(adjectives.length)];
    let code3 = animals[getRandomInt(animals.length)];
    return [code1, code2, code3];
}

function setupTeacherView(existingClass){
    let divContainer = document.createElement("div")

    let pageTitle = document.createElement("h2")

    let pageSubtitle = document.createElement("p")
    pageSubtitle.innerText = "Din klasse har fået dette kodeord:"

    let keyCodeNumber = document.createElement("p")
    keyCodeNumber.classList.add("classIDfield")
    keyCodeNumber.classList.add("classIDfieldBorder")
    keyCodeNumber.setAttribute("id", "constructID1")
    keyCodeNumber.innerText = enteredKeyCode[0]
        
    let keyCodeAdjective = document.createElement("p")
    keyCodeAdjective.classList.add("classIDfield")
    keyCodeAdjective.classList.add("classIDfieldBorder")
    keyCodeAdjective.setAttribute("id", "constructID2")
    keyCodeAdjective.innerText = enteredKeyCode[1]       

    let keyCodeAnimal = document.createElement("p")
    keyCodeAnimal.classList.add("classIDfield")
    keyCodeAnimal.classList.add("classIDfieldBorder")
    keyCodeAnimal.setAttribute("id", "constructID3")
    keyCodeAnimal.innerText = enteredKeyCode[2]

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

    entryContainer.innerHTML = "";
    entryContainer.appendChild(divContainer)

    divContainer.appendChild(pageTitle)
    if(!existingClass){
        divContainer.appendChild(pageSubtitle)
    }
    divContainer.appendChild(keyCodeNumber)
    divContainer.appendChild(breakElement1)
    divContainer.appendChild(keyCodeAdjective)
    divContainer.appendChild(breakElement2)
    divContainer.appendChild(keyCodeAnimal)
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
    })

    let saveAllBtn = document.createElement("button")
    saveAllBtn.innerText = "Gem klasse og sange"
    saveAllBtn.addEventListener("click", () => {
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

function updateSongListHTML(){
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
            activateSong(i)
        }
    }   
}