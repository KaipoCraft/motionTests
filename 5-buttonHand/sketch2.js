import IndexPointer from "./indexPointer.js";
import Button from "./button.js";
import DragLine from "./dragLine.js";
const videoElement = document.getElementsByClassName('input_video')[0];
let width = 1280;               // Width of the canvas
let height = 720;               // Height of the canvas
let fr;                         // Frame Rate Counter
let c;                          // Hand Line Color
let radiusFactor = 20;
let button1, button2;
let indexPoints;
let dragLineList = [];
let thickness = 1;

// P5 setup function
window.setup = function() {
    createCanvas(width, height);
    c = color(250,250,250);
}

// P5 draw function
window.draw = function() {
    // Draw a line eminating from the index tip
    // The line's x keeps growing incrementally, while the y equals the y value of the index tip
    background(220);

    if (indexPoints != null) {
        dragLineList.push(new DragLine(indexPoints.x, indexPoints.y));
    }

    beginShape();
    let xoff = 0;
    for (let i = 0; i < dragLineList.length; i++) {
        noFill();
        stroke(255);
        strokeWeight(thickness);
        let p = dragLineList[i].draw();
        //let pNoise = map(noise(xoff), 0, 1, 0, 50);
        let sNoise = map(sin(p.x),-1,1,0,50);
        vertex(p.x, p.y+sNoise);
        dragLineList[i].update();
        if (dragLineList[i].finished()) {
            dragLineList.splice(i, 1);
        }
        xoff += 1;
    }
    endShape();

    button1 = new Button(width, 0);
    button2 = new Button(0, 0);
    button1.draw();
    button2.draw();

    let area = button2.getArea();
    print(area[0]);
    if (indexPoints != null) {
        if (indexPoints.x <=  area[0] && indexPoints.y <= area[1]) {
            print('touched!');
        }
    }
}

// Mediapipe Stuff //
window.onResults = function(results) {
    if (results.multiHandLandmarks) {
        for (const landmarks of results.multiHandLandmarks) {
            stroke(c);
            strokeWeight(2);
            var palm = [0,1,5,9,13,17];
            for (var j = 0; j < landmarks.length; j++) {
                let x = landmarks[j].x*width;
                let y = landmarks[j].y*height;
                ellipse(x,y,2);

                var isPalm = palm.indexOf(j);
                var next;
                if (isPalm == -1) {
                    next = landmarks[j-1];
                } else {
                    next = landmarks[palm[(isPalm+1)%palm.length]];
                }

                line(x, y, next.x*width, next.y*height);
            }

            new IndexPointer(landmarks[8].x*width, landmarks[8].y*height).draw();

            indexPoints = createVector(landmarks[8].x*width, landmarks[8].y*height);

            // if (landmarks[8].x*width >= width-btnWidth && landmarks[8].y*height <= btnHeight) {
            //     if (thickness <= 20) {
            //         thickness += 1;
            //     }
            // }
            // if (landmarks[8].x*width <= btnWidth && landmarks[8].y*height <= btnHeight) {
            //     if (thickness > 1) {
            //         thickness -= 1;
            //     }
            // }
        }
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