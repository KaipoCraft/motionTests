const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');
let width = 1280;
let height = 720;
let step = 0.03;
let lerpNum = 0;
let pointList = [];
let cirTrail = [];

function setup() {
    createCanvas(width, height);
}

function draw() {
    background(220);

    // Define and draw ellipses with the hand coordinates
    for (let point of pointList) {
        point.update();
        point.finished();
        point.draw();
    }

    for (let i = pointList.length - 1; i >= 0; i--) {
        if (pointList[i].finished()) {
          pointList.splice(i, 1);
        }
    }

    for (let i = 0; i < pointList.length; i++) {
        let base = createVector(pointList[i].x, pointList[i].y);
        let des = createVector();
        //cirTrail(new LerpLines(base, des, 'purple'));
        //cirTrail.draw();
    }
    
}

class handPoints {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.lifetime = 50;
    }

    draw() {
        ellipse(this.x, this.y, this.r);
    }

    update() {
        this.lifetime -= 5;
    }

    finished() {
        return this.lifetime < 0;
    }
}

class LerpLines {
    constructor(base, des, color) {
        this.base = base;
        this.des = des;
        this.color = color;
        this.lerpNum = 0;
        this.direction = p5.Vector.lerp(this.base, this.des, lerpNum);
    }

    draw() {
        push();
        stroke(this.color);
        strokeWeight(3);
        fill(this.color);
        translate(this.base.x, this.base.y);

        /* line(0, 0, this.vec.x, this.vec.y);
        rotate(this.vec.heading());
        let arrowSize = 5;
        translate(this.vec.mag() - arrowSize, 0);
        triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0); */

        
        ellipse(this.direction.x, this.direction.y, 20);
        pop();
    }

    update() {
        if(this.lerpNum > 1 || this.lerpNum < 0) {
            step *= -1;
        }
        this.lerpNum += step;
    }
}

// Mediapipe Stuff //
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

            p1 = createVector(landmarks[13].x*width, landmarks[13].y*height);
            pointList.push(new handPoints(p1.x, p1.y, 20));
            
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