// Perlin Test
//
// Take a handpoints of Mediapipe
// Make a list of the points in the previous X frames
// Draw a perlin noise shape over it
const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');
let height = 720;
let width = 1280;
let vertexList = [];
let noiseMax = 2.5;
let zoff = 0;

function setup() {
    createCanvas(width, height);
}

function draw() {
    background(200, 200, 250);
    push();
        translate(width/2, height/2);
        stroke(255, 75);
        strokeWeight(1);
        noFill();
        
        for (q = 0; q < 0.5; q += 0.05) {
            
            beginShape();
            for (let a = 0; a < TWO_PI; a+=0.01) {
                let xoff = map(cos(a),-1,1,0,noiseMax) + q;
                let yoff = map(sin(a),-1,1,0,noiseMax) + q;
                let r = map(noise(xoff, yoff, zoff), 0, 1, 100, 200);
                let x = r * cos(a);
                let y = r * sin(a);
                vertex(x,y);
            }
            endShape(CLOSE);
            
        }
        
        zoff += 0.01;
        
        color(255);
        stroke(255);
    pop();

    //scale(-1,1);
}

function onResults(results) {
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
                ellipse(x,y,10);
                i++
            }
            while (i < landmarks.length);

            stroke(c);
            strokeWeight(3);
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
    minTrackingConfidence: 0.8
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