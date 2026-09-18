import { setupStudentView } from "/student-view.js";

let entryContainer = document.getElementById("entryContainer");

export function setupLikeCollection() {
    let likeResultContainer = document.createElement("div");
    likeResultContainer.id = "likeResultContainer";

        let likeResultDisplay = document.createElement("div");
        likeResultDisplay.id = "likeResultDisplay";

        likeResultContainer.appendChild(likeResultDisplay);

    let likeVideoContainer = document.createElement("div");
    likeVideoContainer.id = "likeVideoContainer";

        let likeVideo = document.createElement("video");
        likeVideo.id = "likeVideo";
        likeVideo.setAttribute("autoplay", true);

        let likeVideo$TopOverlay = document.createElement("div");
        likeVideoTopOverlay.id = "likeVideoTopOverlay";

        let likeVideoBottomOverlay = document.createElement("div");
        likeVideoBottomOverlay.id = "likeVideoBottomOverlay";

        likeVideoContainer.appendChild(likeVideo);
        likeVideoContainer.appendChild(likeVideoTopOverlay);
        likeVideoContainer.appendChild(likeVideoBottomOverlay);

    let likeVideoCanvas = document.createElement("canvas");
    likeVideoCanvas.id = "likeVideoCanvas";
    likeVideoCanvas.setAttribute("hidden", true);

    let likeOutput = document.createElement("p");
    likeOutput.textContent = "Output: ";

        let likeOutputValue = document.createElement("span");
        likeOutputValue.id = "likeOutputValue";
        likeOutputValue.textContent = "Calculating...";
    
        likeOutput.appendChild(likeOutputValue);

    let likeCollectButton = document.createElement("button");
    likeCollectButton.id = "likeCollectButton";
    likeCollectButton.textContent = "Gem resultat";
    likeCollectButton.addEventListener("click", () => {
        // Save the result to localStorage
        setupStudentView();
    });

    entryContainer.innerHTML = "";
    entryContainer.appendChild(likeResultContainer);
    entryContainer.appendChild(likeVideoContainer);
    entryContainer.appendChild(likeVideoCanvas);
    entryContainer.appendChild(likeOutput);
    entryContainer.appendChild(likeCollectButton);
}

const factor = 1.2;

const video = document.getElementById('likeVideo');
const canvas = document.getElementById('likeVideoCanvas');
const outputDisplay = document.getElementById('likeOutputValue');
const ctx = canvas.getContext('2d');
const recordAreaDiameter = 400*factor; // Diameter in px
const boxHeight = 70*factor;
const recordAreaDistanceFromTop = 25; // Distance from top in percentage

const videoHeight = 360*factor;
const videoWidth = 480*factor;

let highVarianceCount = 0;
let isAboveThreshold = false;
let objectInside = false;
let maxVariance = 0;
let minVariance = Infinity;
const startTime = Date.now();
let output = 50;

let previousFrame = null;

// Set styling of recording area
document.documentElement.style.setProperty('--diameter', recordAreaDiameter + 'px');
document.documentElement.style.setProperty('--halfDiameter', -Math.ceil(recordAreaDiameter/2) + 'px');
document.documentElement.style.setProperty('--boxHeight', boxHeight + 'px');
document.documentElement.style.setProperty('--leftDistance', Math.ceil((videoWidth-recordAreaDiameter)/2) + 'px');
document.documentElement.style.setProperty('--videoHeight', videoHeight + 'px');
document.documentElement.style.setProperty('--videoWidth', videoWidth + 'px');

document.getElementById('likeResultDisplay').style.top = (videoHeight/2)-5 + 'px';



// Set up the video stream
navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        video.srcObject = stream;
    }).catch(err => {
        console.error("Webcam access error:", err);
    });

function getTopPixels(imageData, centerX){
    const pixels = [];
    for (let y = 0; y <= boxHeight; y++) {
        for (let x = centerX - (recordAreaDiameter/2); x <= centerX + (recordAreaDiameter/2); x++) {
            const index = (y * imageData.width + x) * 4;
            pixels.push(imageData.data[index]);     // R
            pixels.push(imageData.data[index + 1]); // G
            pixels.push(imageData.data[index + 2]); // B
            pixels.push(imageData.data[index + 3]); // A
        }
    }
    return pixels;
}

function getBottomPixels(imageData, centerX){
    const pixels = [];
    for (let y = videoHeight-boxHeight; y <= videoHeight; y++) {
        for (let x = centerX - (recordAreaDiameter/2); x <= centerX + (recordAreaDiameter/2); x++) {
            const index = (y * imageData.width + x) * 4;
            pixels.push(imageData.data[index]);     // R
            pixels.push(imageData.data[index + 1]); // G
            pixels.push(imageData.data[index + 2]); // B
            pixels.push(imageData.data[index + 3]); // A
        }
    }
    return pixels;
}

function getCirclePixels(imageData, centerX, centerY, radius) {
    const pixels = [];
    for (let y = centerY - radius; y <= centerY + radius; y++) {
        for (let x = centerX - radius; x <= centerX + radius; x++) {
            const dx = x - centerX;
            const dy = y - centerY;
            if (dx * dx + dy * dy <= radius * radius) { // if within the target area
                const index = (y * imageData.width + x) * 4;
                pixels.push(imageData.data[index]);     // R
                pixels.push(imageData.data[index + 1]); // G
                pixels.push(imageData.data[index + 2]); // B
                pixels.push(imageData.data[index + 3]); // A
            }
        }
    }
    return pixels;
}

function calculateVariance(pixels1, pixels2) {
    let sum = 0;
    let count = pixels1.length;
    for (let i = 0; i < count; i++) {
    let diff = pixels1[i] - pixels2[i];
    sum += diff * diff;
    }
    return (sum / count).toFixed(2);
}

function captureFrame() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function updateCounter() {
    highVarianceCount++;
    document.getElementById('counter').textContent = highVarianceCount;
}

function updateExtremes(variance) {
    const elapsed = Date.now() - startTime;
    if (elapsed < 2000) return; // Skip updates during first second

    const numericVariance = parseFloat(variance);

    if (numericVariance > maxVariance) {
    maxVariance = numericVariance;
    document.getElementById('max').textContent = maxVariance.toFixed(2);
    }

    if (numericVariance < minVariance) {
    minVariance = numericVariance;
    document.getElementById('min').textContent = minVariance.toFixed(2);
    }
}

setInterval(() => {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        const frame = captureFrame();
        const centerX = canvas.width / 2;
        //const centerY = canvas.height / (100/recordAreaDistanceFromTop);
        //const radius = recordAreaDiameter/2;

        const currentTopPixels = getTopPixels(frame, centerX);

        const currentBottomPixels = getBottomPixels(frame, centerX);

        if (previousFrame) {
            const previousTopPixels = getTopPixels(previousFrame, centerX);
            const previousBottomPixels = getBottomPixels(previousFrame, centerX);

            const topVariance = calculateVariance(currentTopPixels, previousTopPixels);
            const bottomVariance = calculateVariance(currentBottomPixels, previousBottomPixels);

            let activateUp = false
            let activateDown = false

            if(topVariance>500){
                document.getElementById("likeVideoTopOverlay").style.borderColor = "green";
                document.getElementById("likeVideoTopOverlay").style.backgroundColor = "green";
                activateUp = true;
            } else{
                document.getElementById("likeVideoTopOverlay").style.borderColor = "grey";
                document.getElementById("likeVideoTopOverlay").style.backgroundColor = "grey";

            }

            if(bottomVariance>500){
                document.getElementById("likeVideoBottomOverlay").style.borderColor = "green";
                document.getElementById("likeVideoBottomOverlay").style.backgroundColor = "green";
                activateDown = true
            } else{
                document.getElementById("likeVideoBottomOverlay").style.borderColor = "grey";
                document.getElementById("likeVideoBottomOverlay").style.backgroundColor = "grey";
            }

            if(activateUp){
                output +=1
                if(output>100){
                    output = 100;
                }
            }
            if(activateDown){
                output -=1
                if(output<0){
                    output = 0;
                }
            }

            outputDisplay.innerText = output
            document.getElementById('likeResultDisplay').style.top = videoHeight/100*(100-output) + 'px';

        }

        previousFrame = frame;
    }
}, 100);