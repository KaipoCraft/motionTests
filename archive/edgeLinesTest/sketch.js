const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');
let focalX, focalY;
let speed = 5;
var focalPoint = [];


function setup() {
    createCanvas(600, 600);
    focalX = width/2;
    focalY = height/2;
}

function draw() {
    background(220);
    
    for (var y = 0; y <= height; y += height / 10) {
        for (var x = 0; x <= width; x += width / 10) {
            if (focalPoint != null) {
                focalX = focalPoint.x*width;
                focalY = focalPoint.y*height;
            }

            r = 5;
            strokeWeight(1);
            stroke(255);
            fill(255);
            ellipse(0, y, r);
            ellipse(x, 0, r);
            ellipse(width, y, r);
            ellipse(x, height, r);
            //ellipse(x, y, 10);
            //line(x, y, focalX, focalY);

            // Draw lines from the edges to the focal point
            line(0, y, focalX, focalY);
            line(x, 0, focalX, focalY);
            line(width, y, focalX, focalY);
            line(x, height, focalX, focalY);

            
        }
    }
    
    push();
        fill(100);
        ellipse(focalX, focalY, 15);
    pop();

    //focalX += speed;

    if (focalX > width || focalX < 0) {
        speed *= -1;
    }
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
                ellipse(x,y,5);
                i++
            }
            while (i < landmarks.length);

            stroke(c);
            strokeWeight(5);
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
            
            focalPoint = landmarks[8];
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