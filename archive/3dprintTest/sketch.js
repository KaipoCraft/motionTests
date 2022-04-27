const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');
let width = 1280;
let height = 720;
let arrayList = [];
let currentHands;

// Mediapipe Stuff //
function onResults(results) {
    currentHands = null;
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
        results.image, 0, 0, canvasElement.width, canvasElement.height);
    if (results.multiHandLandmarks) {
        if (results.multiHandLandmarks.length != 0) {
            //arrayList.push(results.multiHandLandmarks);
            currentHands = results.multiHandLandmarks;
        }

        for (const landmarks of results.multiHandLandmarks) {
            drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
                        {color: '#FFFFFF', lineWidth: 5});
            drawLandmarks(canvasCtx, landmarks, {color: '#FFFFFF', lineWidth: 2});
        }
    }
    canvasCtx.restore();
}
  
const hands = new Hands({locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
}});
hands.setOptions({
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
});
hands.onResults(onResults);
  
const camera = new Camera(videoElement, {
    onFrame: async () => {
      await hands.send({image: videoElement});
    },
    width: 1280,
    height: 720
});
camera.start();

function setup() {
    createCanvas(width, height);
    i = 0;
}

function draw() {
    background(220, 0.75);
    
    // I want it to print the results only when a new one has been added to the array
    // if length of list > print length then print again
    // if list is in an object, add to list and print in the same function

    if (frameCount % 20 == 0) {
        if (currentHands != null) {
            for (h = 0; h < currentHands.length; h++) {
                print(currentHands[h]);
                for (p = 0; p < currentHands[h].length; p++) {
                    x = currentHands[h][p].x*width;
                    y = currentHands[h][p].y*height;
                    ellipse(x, y, 15);
                }
            }
        }
    }
}

//export let myList = arrayList;