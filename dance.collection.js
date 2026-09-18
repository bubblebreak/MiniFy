import { setupStudentView } from "/student-view.js";

let entryContainer = document.getElementById("entryContainer");

export function setupDanceCollection() {
    let viewLabel = document.createElement("label");
    viewLabel.setAttribute("for", "setView");

    let viewSelect = document.createElement("select");
    viewSelect.setAttribute("id", "setView");
    viewSelect.setAttribute("name", "setView");

        let option1 = document.createElement("option");
        option1.setAttribute("value", "0");
        option1.textContent = "Webcam + Flimmer";

        let option2 = document.createElement("option");
        option2.setAttribute("value", "1");
        option2.textContent = "Webcam";

        let option3 = document.createElement("option");
        option3.setAttribute("value", "2");
        option3.textContent = "Flimmer";

        viewSelect.appendChild(option1);
        viewSelect.appendChild(option2);
        viewSelect.appendChild(option3);

    let videoDetails = document.createElement("div");
    videoDetails.setAttribute("id", "videoDetails");

        let currentDanceScoreWrapper = document.createElement("p");
        currentDanceScoreWrapper.textContent = "Current dance score: ;"
        let currentDanceScorePreview = document.createElement("span");
        currentDanceScorePreview.setAttribute("id", "mappedDiffValue");
        currentDanceScorePreview.textContent = "0";
        currentDanceScoreWrapper.appendChild(currentDanceScorePreview);

        let averageDanceScoreWrapper = document.createElement("p");
        averageDanceScoreWrapper.textContent = "Average dance score: ;"
        let averageDanceScorePreview = document.createElement("span");
        averageDanceScorePreview.setAttribute("id", "valueDisplay");
        averageDanceScorePreview.textContent = "0";
        averageDanceScoreWrapper.appendChild(averageDanceScorePreview);

        let remainingTimeWrapper = document.createElement("p");
        remainingTimeWrapper.textContent = "Remaining time: ;"
        let remainingTimePreview = document.createElement("span");
        remainingTimePreview.setAttribute("id", "timeDisplay");
        remainingTimePreview.textContent = "0";
        remainingTimeWrapper.appendChild(remainingTimePreview);

        videoDetails.appendChild(currentDanceScoreWrapper);
        videoDetails.appendChild(averageDanceScoreWrapper);
        videoDetails.appendChild(remainingTimeWrapper);

    let videoContainer = document.createElement("div");
    videoContainer.setAttribute("id", "videoContainer");
    
        let videoOverlay = document.createElement("div");
        videoOverlay.setAttribute("id", "videoOverlay");

        let overlayText = document.createElement("h2");
        overlayText.setAttribute("id", "overlayText");
        
        videoOverlay.appendChild(overlayText);

        let videoElement = document.createElement("video");
        videoElement.setAttribute("id", "video");
        videoElement.setAttribute("autoplay", true);
        videoElement.setAttribute("playsinline", true);

        let saturationCanvas = document.createElement("canvas");
        saturationCanvas.setAttribute("id", "saturationCanvas");
        saturationCanvas.style.height = "480";
        saturationCanvas.style.width = "640";

        videoContainer.appendChild(videoOverlay);
        videoContainer.appendChild(videoElement);
        videoContainer.appendChild(saturationCanvas);
    
    let canvas1 = document.createElement("canvas");
    canvas1.setAttribute("id", "canvas1");
    
    let progressContainer = document.createElement("div");
    progressContainer.setAttribute("id", "progressContainer");

        let progressBar = document.createElement("div");
        progressBar.setAttribute("id", "progressBar");

        progressContainer.appendChild(progressBar);
    
    let startDanceCountdownButton = document.createElement("button");
    startDanceCountdownButton.setAttribute("id", "startDanceCountdownButton");
    startDanceCountdownButton.textContent = "Start countdown";
    startDanceCountdownButton.addEventListener("click", () => {
        initiateCountdown();
    });

    let inputDanceDuration = document.createElement("div");
    
        let danceDurationLabel = document.createElement("label");
        danceDurationLabel.setAttribute("for", "collectDuration");
        danceDurationLabel.textContent = "Collection duration:";

        let danceDurationInput = document.createElement("input");
        danceDurationInput.setAttribute("type", "number");
        danceDurationInput.setAttribute("id", "collectDuration");

        let danceDurationUpdateButton = document.createElement("button");
        danceDurationUpdateButton.setAttribute("id", "updateDuration");
        danceDurationUpdateButton.textContent = "Update";

        inputDanceDuration.appendChild(danceDurationLabel);
        inputDanceDuration.appendChild(danceDurationInput);
        inputDanceDuration.appendChild(danceDurationUpdateButton);
    
    let inputFrameRate = document.createElement("div");
    
        let frameRateLabel = document.createElement("label");
        frameRateLabel.setAttribute("for", "frameRate");
        frameRateLabel.textContent = "Number of frames per second:";

        let frameRateInput = document.createElement("input");
        frameRateInput.setAttribute("type", "number");
        frameRateInput.setAttribute("id", "frameRate");

        let frameRateUpdateButton = document.createElement("button");
        frameRateUpdateButton.setAttribute("id", "updateFrames");
        frameRateUpdateButton.textContent = "Update";
    
        inputFrameRate.appendChild(frameRateLabel);
        inputFrameRate.appendChild(frameRateInput);
        inputFrameRate.appendChild(frameRateUpdateButton);
    
    let inputSensitivity = document.createElement("div");
    
        let sensitivityLabel = document.createElement("label");
        sensitivityLabel.setAttribute("for", "sensitivitySlider");
        sensitivityLabel.textContent = "Sensitivity threshold:";

        let sensitivityInput = document.createElement("input");
        sensitivityInput.setAttribute("type", "range");
        sensitivityInput.setAttribute("id", "sensitivitySlider");

        let sensitivityValueDisplay = document.createElement("p");
        sensitivityValueDisplay.setAttribute("id", "sensitivityValue");
        sensitivityValueDisplay.textContent = "50%";

        inputSensitivity.appendChild(sensitivityLabel);
        inputSensitivity.appendChild(sensitivityInput);
        inputSensitivity.appendChild(sensitivityValueDisplay);
        
    entryContainer.innerHTML = "";
    entryContainer.appendChild(viewLabel);
    entryContainer.appendChild(viewSelect);
    entryContainer.appendChild(videoDetails);
    entryContainer.appendChild(videoContainer);
    entryContainer.appendChild(canvas1);
    entryContainer.appendChild(progressContainer);
    entryContainer.appendChild(startDanceCountdownButton);
    entryContainer.appendChild(inputDanceDuration);
    entryContainer.appendChild(inputFrameRate);
    entryContainer.appendChild(inputSensitivity);
}

/////////// Code for calculating the pixel difference

// Register global minima and maxima
let maxDiff = 0;
//const maxDiffDisplay = document.getElementById('maxDiffValue');
let minDiff = null;
//const minDiffDisplay = document.getElementById('minDiffValue');

// Register local minima and maxima when setting the sensitivity
let minRange = minDiff;
let maxRange = maxDiff;
const mappedDiffDisplay = document.getElementById('mappedDiffValue');

// Variables to control data collection duration
let collecting = false;
let collectValue = 0;
let collectInterval = 0;
let interval = 250; // 0.25 seconds
let duration = 30000; // 30 seconds
let steps = duration / interval;
const remainingTimeDisplay = document.getElementById("timeDisplay");
const durationValueInput = document.getElementById("collectDuration");
const updateDurationButton = document.getElementById("updateDuration");
durationValueInput.value = duration/1000;
updateDurationButton.addEventListener("click", updateDuration);
durationValueInput.addEventListener("change", updateDuration);
durationValueInput.addEventListener("keypress", e =>{if(e.key === "Enter"){updateDuration()}});
const frameRateInput = document.getElementById("frameRate");
const updateFrames = document.getElementById("updateFrames");
frameRateInput.value = 4;
updateFrames.addEventListener("click", updateFrameRate);
frameRateInput.addEventListener("change", updateFrameRate);
frameRateInput.addEventListener("keypress", e =>{if(e.key === "Enter"){updateFrameRate();}});

function updateDuration(){
    duration = durationValueInput.value*1000;
    steps = duration / interval;
}

function updateFrameRate(){
    interval = 100/frameRateInput.value*10;
    console.log(frameRateInput.value);

    console.log(interval);
    steps = duration / interval;
}


// Variables for the progress bar and temporary value
const progressContainer = document.getElementById("progressContainer")
progressContainer.style.width = canvasWidth*2 + "px";
const progressBar = document.getElementById('progressBar');
progressBar.style.width = '0%';
const display = document.getElementById('valueDisplay');

// Variables for controlling the sensitivity
const sensitivitySlider = document.getElementById('sensitivitySlider');
sensitivitySlider.max = 100;
sensitivitySlider.min = 0;
sensitivitySlider.value = 50;
const sensitivityValueDisplay = document.getElementById('sensitivityValue');
sensitivityValueDisplay.textContent = `50`;
// Update the sensitivity when 
sensitivitySlider.addEventListener('input', () => {
    let mappedSensitivity = 100-Math.floor(((sensitivitySlider.value - minDiff) / (maxDiff - minDiff)) * 100);
    sensitivityValueDisplay.textContent = `${mappedSensitivity}`;
    maxRange = sensitivitySlider.value;
});

// Variables for the video stream and display
const video = document.getElementById('video');
const canvas1 = document.getElementById('canvas1');
const videoDetails = document.getElementById("videoDetails");
const videoOverlay = document.getElementById("videoOverlay");
const overlayText = document.getElementById("overlayText");
videoDetails.style.width = canvasWidth*2 + "px";
videoOverlay.style.width = canvasWidth*2 + "px";
videoOverlay.style.height = canvasHeight + "px";
videoOverlay.style.display = "none";
const diffDisplay = document.getElementById('diffValue');
let prevImageData = null;
let lastUpdateTime = 0;

// Controls to display/hide video and noise
const representationSetting = document.getElementById("setView");
representationSetting.addEventListener("change", e=>{
    switch(representationSetting.value){
        case "0": 
            video.style.display = "inline"; 
            saturationCanvas.style.display = "inline"; 
            progressContainer.style.width = canvasWidth*2 + "px";
            videoDetails.style.width = canvasWidth*2 + "px";
            videoOverlay.style.width = canvasWidth*2 + "px";
            break;
        case "1": 
            video.style.display = "inline"; 
            saturationCanvas.style.display = "none";
            progressContainer.style.width = canvasWidth + "px";
            videoDetails.style.width = canvasWidth + "px";
            videoOverlay.style.width = canvasWidth + "px";
            break;
        case "2": 
            video.style.display = "none"; 
            saturationCanvas.style.display = "inline";
            progressContainer.style.width = canvasWidth + "px";
            videoDetails.style.width = canvasWidth + "px";
            videoOverlay.style.width = canvasWidth + "px";
    }
    console.log(representationSetting.value);
})

// Initiate the video stream
navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    video.srcObject = stream;
    video.play();
}).catch(err => {
    console.error("Error accessing webcam:", err);
});

// While the video is active, constantly look for changes in pixel value
video.addEventListener('playing', () => {
    requestAnimationFrame(processFrame);
});

/**
 * Function to compute the pixel difference into a numerical value, by looking at variations for each of the three pixel values (RGB)
 * @param {*} data1 Previous frame
 * @param {*} data2 Nesest frame
 * @returns Difference as a numerical value
 */
function computePixelDifference(data1, data2) {
    let diff = 0;
    for (let i = 0; i < data1.data.length; i += 4) {
        const rDiff = Math.abs(data1.data[i] - data2.data[i]);
        const gDiff = Math.abs(data1.data[i + 1] - data2.data[i + 1]);
        const bDiff = Math.abs(data1.data[i + 2] - data2.data[i + 2]);
        diff += rDiff + gDiff + bDiff;
    }
    return diff;
}

/**
 * Function to collect  video frames, request pixel difference and storing relevant values
 * @returns Pixel difference as a value between 0 and 100, presented on the GUI
 */
function processFrame() {
    const width = video.videoWidth;
    const height = video.videoHeight;

    if (width === 0 || height === 0) {
        requestAnimationFrame(processFrame);
        return;
    }

    canvas1.width = width;
    canvas1.height = height;

    // Collect a video frame
    const ctx1 = canvas1.getContext('2d');
    ctx1.drawImage(video, 0, 0, width, height);
    const currentImageData = ctx1.getImageData(0, 0, width, height);

    // Only analyse a frame every 0.25 sec
    const now = performance.now();
    if (prevImageData && now - lastUpdateTime >= interval) {
        const diff = computePixelDifference(prevImageData, currentImageData);
        if (diff !== 0) {
            //diffDisplay.textContent = `Pixel Difference: ${diff}`;

            // Check if new maxima
            if (diff > maxDiff) {
                // Update the sensitivity slider values
                updateSlider(diff, true)
                maxDiff = diff;
                maxRange = diff
                //maxDiffDisplay.textContent = `Highest Pixel Difference: ${maxDiff}`;
            }

            // Check if new minima
            if (minDiff === null || diff < minDiff) {
                // Update the sensitivity slider values
                updateSlider(diff, false)
                minDiff = diff;
                minRange = diff;
                //minDiffDisplay.textContent = `Smallest Pixel Difference: ${minDiff}`;
            }
            
            // Map the pixel difference to a value between 0 and 100
            let mapped = Math.max(0, Math.min(100, ((diff - minRange) / (maxRange - minRange)) * 100));
            mapped = Math.floor(mapped.toFixed(2));
            mappedDiffDisplay.textContent = `${mapped}`;
            // Update datavisualisation to reflect the degree of movement
            ctx.clearRect(0, 0, width, height);
            scatterClusters(mapped);
            // Check for whether a collection is happening
            if(collecting){
                collectValue += mapped;
                collectInterval +=1;
                display.innerText = Math.ceil(collectValue/collectInterval);
            }
        }
        // Update timer
        lastUpdateTime = now;
        }

    // Update previous frame
    prevImageData = currentImageData;
    requestAnimationFrame(processFrame);
}

/**
 * Function to keep the sensitivity slider updated with the minima and maxima
 * @param {*} newValue  Numerical value to update with
 * @param {*} newMax    Boolean for if the value is a maxima
 */
function updateSlider(newValue, newMax){
    let oldValue = sensitivitySlider.value;
    if(newMax){
        oldValue += Math.ceil((newValue - maxDiff)/2);
        sensitivitySlider.max = newValue;
    } else{
        oldValue -= Math.ceil((minDiff - newValue)/2);
        sensitivitySlider.min = newValue;
    }
    sensitivitySlider.value = oldValue;
}

/**
 * Function to start data collecting. The progress bar is updated here to ensure it moves smoothly during the intended amount of time.
 */
function startCollecting() {
    
    collecting = true;
    collectValue = 0;
    collectInterval = 0;
    let count = 0;

    const timer = setInterval(() => {
        count++;
        remainingTimeDisplay.innerText = (duration/1000) - Math.floor(count/frameRateInput.value);
        progressBar.style.width = `${(count / steps) * 100}%`;
        if (count >= steps) {
            clearInterval(timer);
            progressBar.style.width = `0%`;
            collecting = false;
            sensitivitySlider.removeAttribute("disabled");
            durationValueInput.removeAttribute("disabled");
            frameRateInput.removeAttribute("disabled");
        }
    }, interval);
}

function initiateCountdown(){
    sensitivitySlider.setAttribute("disabled", true);
    durationValueInput.setAttribute("disabled", true);
    frameRateInput.setAttribute("disabled", true);
    videoOverlay.style.display = "flex";
    let countdown = 3;
    overlayText.innerText = `${countdown}`;

    const countdownTimer = setInterval(() => {
        countdown--;   
        overlayText.innerText = `${countdown}`;
        if (countdown == 0) {
            overlayText.innerText = `START!`;
        }     
        if (countdown < 0) {
            clearInterval(countdownTimer);
            startCollecting()
            videoOverlay.style.display="none";
        }
    }, 1000);
}

/////////// Code for the data visualisation


const saturationCanvas = document.getElementById('saturationCanvas');
const ctx = saturationCanvas.getContext('2d');
const canvasWidth = saturationCanvas.width;
const canvasHeight = saturationCanvas.height;

const monochromeHue = 280; // purple hue
const clusterSize = 5;
const fadeDuration = 250; // milliseconds

function scatterClusters(value) {
  const clusterCount = Math.floor((value / 100) * canvasWidth * canvasHeight * 0.02); // 2% max scatter

  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;

  const positions = [];
  for (let i = 0; i < clusterCount * 2; i++) { // generate extra for sorting
    const x = Math.floor(Math.random() * (canvasWidth - clusterSize));
    const y = Math.floor(Math.random() * (canvasHeight - clusterSize));
    const dx = x + clusterSize / 2 - centerX;
    const dy = y + clusterSize / 2 - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    positions.push({ x, y, distance });
  }

  // Sort by proximity to center
  positions.sort((a, b) => a.distance - b.distance);

  for (let i = 0; i < clusterCount; i++) {
    const { x, y } = positions[i];
    const rgb = hslToRgb(monochromeHue / 360, value / 100, 0.5);
    ctx.fillStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    ctx.fillRect(x, y, clusterSize, clusterSize);
  }
}

function hslToRgb(h, s, l) {
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}