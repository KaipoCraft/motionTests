import { drawHand } from "./drawHand.js";
import { videoElement, canvasElement, canvasCtx } from "./mediapipe.js";
import { IndexPointer } from "./test.js";
//import { CapoeiraStyle } from "./capoeira.js";
let index;
let pointer;
let width = 1280;
let height = 720;
let color = [255, 255, 255];

// Mediapipe Stuff //
window.onResults = function(results) {
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
        results.image, 0, 0, canvasElement.width, canvasElement.height);
    if (results.multiHandLandmarks) {
    
        for (const landmarks of results.multiHandLandmarks) {

            drawHand(landmarks, color);
            
            index = createVector(landmarks[8].x*width, landmarks[8].y*height);
            pointer = new IndexPointer(index.x, index.y);
            pointer.draw();
            pointer.update();
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
    minDetectionConfidence: 0.6,
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

window.setup = function() {
    createCanvas(width, height);
}

window.draw = function() {
    background(0, 0, 0);
}