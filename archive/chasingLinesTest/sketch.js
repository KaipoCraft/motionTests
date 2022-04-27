import { handPoints } from './handPoints.js';
const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
let width = 1280;
let height = 720;

// The list of points to be drawn
let pointList = [];
// The radius of the ellipses drawn at the points
let r;
// The length of time the points stick around for
let lifetime = 200;
// The amount of frames it takes to set a new point
let frameRefresh = 1;
let thickSlider, lifeSlider, refreshSlider;


window.setup = function() {
    createCanvas(width, height);

    // Create sliders to adjust settings
    thickSlider = createSlider(1, 50, 5, 5);
    thickSlider.position(50, 500);
    thickSlider.style('width', '150px');
    lifeSlider = createSlider(1, 200, 100, 10);
    lifeSlider.position(50, 550);
    lifeSlider.style('width', '150px');
    refreshSlider = createSlider(1, 10, 1, 1);
    refreshSlider.position(50, 600);
    refreshSlider.style('width', '150px');
    
}

window.draw = function() {
    background(220);
    
    push();
    strokeWeight(1);
    stroke(0);
    textSize(24);
    fill(0);
    text('Point Radius', 40, 485);
    text('Point Lifespan', 40, 535);
    text('Refresh Rate', 40, 585);
    pop();
    r = thickSlider.value();
    lifetime = lifeSlider.value();
    frameRefresh = refreshSlider.value();

    // Define and draw ellipses with the hand coordinates
    for (let point of pointList) {
        point.update();
        point.finished();
        point.draw();
    }

    for (let i = pointList.length - 1; i >= 0; i--) {
        if (pointList[i+3] != null) {
            print(pointList[i].v1.x, pointList[i+1].v1.x);
            push();
            strokeWeight(thickSlider.value());
            bezier(
                pointList[i].v1.x, pointList[i].v1.y, 
                pointList[i+1].v1.x, pointList[i+1].v1.y,
                pointList[i+2].v1.x, pointList[i+2].v1.y,
                pointList[i+3].v1.x, pointList[i+3].v1.y);
            pop();
        }
        if (pointList[i].finished()) {
          pointList.splice(i, 1);
        }
    }
}

// Mediapipe Stuff //
window.onResults = function(results) {
    if (results.multiHandLandmarks) {
        for (const landmarks of results.multiHandLandmarks) {
            let c = color(250,250,250);
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
            }

            
            if (frameCount % frameRefresh == 0) {
                let p1 = createVector(landmarks[8].x*width, landmarks[8].y*height);
                pointList.push(new handPoints(p1.x, p1.y, r, lifetime));
            }
        }
    }
}

function calculateDistance(v1, v2) {
    d = sqrt(sq(v2.x - v1.x) + sq(v2.y - v1.y));
    return d;
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