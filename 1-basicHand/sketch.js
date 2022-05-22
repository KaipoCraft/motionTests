import Mediapipe from "../MediapipeHands.js";
const videoElement = document.getElementsByClassName('input_video')[0];
let width = 1280;
let height = 720;

let mp = new Mediapipe();
mp.runMediapipe();


window.setup = function() {
    createCanvas(width, height);
}

window.draw = function() {
    background(220);

    if (mp.index != null) {
        //console.log(mp.index);
    }

}

const hands = new Hands({locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
}});
hands.setOptions({
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.6,
    minTrackingConfidence: 0.7
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