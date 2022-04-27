const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
let width = 1280;
let height = 720;
// Create empty list to be filled with handpoints
let handPoints = [];
let frameRefresh = 10;
let c = color(250,250,250);

function setup() {
    createCanvas(width, height);
}

function draw() {
    background(220);
    //for (i = 0; i < handPoints.length; i++) {
    //    let x = handPoints[i].x;
    //    let y = handPoints[i].y;
    //    let z = handPoints[i].z;

    //       ellipse(x, y, 10);
    //  }

    //for (i = 0; i < handPoints.length; i++) {
    //    print(handPoints[i].i);
    //}
}

// Mediapipe Stuff //
function onResults(results) {
    if (results.multiHandLandmarks) {
        for (let hand in results.multiHandLandmarks) {
            new Hand(hand).draw();
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



class Hand {
    constructor(array) {
        this.array = array;
    }

    draw() {
        for (const landmarks in this.array) {
            let i = 0;

            do {
                stroke(c);
                strokeWeight(3);
                noFill();
                let x = landmarks[i].x*width;
                let y = landmarks[i].y*height;
                let z = landmarks[i].z;
                if (frameCount % frameRefresh == 0) {
                    //let point = createVector(x, y, z);
                    //handPoints.push(point);
                    handPoints.push(new labeledPoint(x, y, z, i));
                }
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
        }
    }
}

// Object of lines that are drawn between previous points
class Lines {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }

    draw() {
        line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
    }
}

// Object for hand points
class labeledPoint {
    constructor(x, y, z, i) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.i = i;
        this.list = [];
    }

    update() {
        let point = createVector(this.x, this.y, this.z);
        this.list.push(point);
    }

    getPreviousPoints() {

    }

    coordinate() {
        this.x = x;
        this.y = y;
        this.z = z;
        return createVector(x, y, z);
    }

    draw() {
        
    }
}