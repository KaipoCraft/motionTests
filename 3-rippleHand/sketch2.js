import Ripple from "./rippleHand.js";
const videoElement = document.getElementsByClassName('input_video')[0];
let width = 1280;
let height = 720;
let cols, rows;
let current, previous;
let dampening = 1;
let rippleList = [];

window.setup = function() {
    pixelDensity(1);
    createCanvas(width, height);
    cols = width;
    rows = height;
    current = new Array(cols).fill(0).map(n => new Array(rows).fill(0));
    previous = new Array(cols).fill(0).map(n => new Array(rows).fill(0));
}

window.draw = function() {
    background(225,0,0); 

    for (let ripple of rippleList) {
        ripple.draw();
        ripple.update();
    }

    for (let i = rippleList.length - 1; i >= 0; i--) {
        if (rippleList[i].finished()) {
            rippleList.splice(i, 1);
        }
    }

    print(rippleList);
}

// Mediapipe Stuff //
window.onResults = function(results) {
    if (results.multiHandLandmarks) {
        let rippleX, rippleY;
        for (const landmarks of results.multiHandLandmarks) {
            let c = color(0,0,250);
            let i = 0;

            do {
                stroke(c);
                strokeWeight(3);
                noFill();
                let x = landmarks[i].x*width;
                let y = landmarks[i].y*height;
                let z = landmarks[i].z;
                ellipse(x,y,2);
                i++
            }
            while (i < landmarks.length);

            stroke(c);
            strokeWeight(2);
            var palm = [0,1,5,9,13,17];
            for (var j = 0; j < landmarks.length; j++) {
                let x = landmarks[j].x*width;
                let y = landmarks[j].y*height;

                var isPalm = palm.indexOf(j);
                var next;
                if (isPalm == -1) {
                    next = landmarks[j-1];
                } else {
                    next = landmarks[palm[(isPalm+1)%palm.length]];
                }

                line(x, y, next.x*width, next.y*height);

                //pointList.push(createVector(landmarks[8].x*width, landmarks[8].y*height));
                //previous[landmarks[8].x*width][landmarks[8].y*height] = 500;
                //print(landmarks[8].x*width);
                rippleX = Math.round(landmarks[8].x*width);
                rippleY = Math.round(landmarks[8].y*height);
                // cursor = [x,y];
                // previous[cursor[0]][cursor[1]] = 500;
                
            }
        }
        rippleList.push(new Ripple(cols, rows, rippleX, rippleY, dampening));
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