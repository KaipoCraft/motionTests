import IndexPointer from "./indexPointer.js";
import Button from "./button.js";
import DragLine from "./LinePoints.js";
import Style1 from "./style1.js";
import Style2 from "./style2.js";
import Style3 from "./style3.js";
const videoElement = document.getElementsByClassName('input_video')[0];
let width = 1280;               // Width of the canvas
let height = 720;               // Height of the canvas
let c;                          // Hand Line Color
let button1, button2, button3;
let indexPoints;
// let dragLineList = [];   Now in Style1
let thickness = 1;
let btnMargin = 30;
let backColor = [155,100,100];
let curStyle = Style1;

//--------------------------------------//
//--------------P5 Setup----------------//
//--------------------------------------//
window.setup = function() {
    createCanvas(width, height);
    c = color(250,250,250);
}

//--------------------------------------//
//---------------P5 Draw----------------//
//--------------------------------------//
window.draw = function() {
    // Draw a line eminating from the index tip
    // The line's x keeps growing incrementally, while the y equals the y value of the index tip
    background(backColor);

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
        //let sNoise = map(sin(p.x),-1,1,0,50);
        vertex(p.x, p.y);
        dragLineList[i].update();
        if (dragLineList[i].finished()) {
            dragLineList.splice(i, 1);
        }
        xoff += 1;
    }
    endShape();

    //--------------------------------------//
    //---------------Buttons----------------//
    //--------------------------------------//

    button1 = new Button(btnMargin, btnMargin, 'Style 1');
    button1.draw();
    let area1 = button1.getArea();
    button2 = new Button(btnMargin, area1[2]+btnMargin, 'Style 2');
    let area2 = button2.getArea();
    button2.draw();
    button3 = new Button(btnMargin, area2[2]+btnMargin, 'Style 3');
    let area3 = button3.getArea();
    button3.draw();

    // Button 1 activation and action
    if (indexPoints != null) {
        if (indexPoints.y >=  area1[0] 
            && indexPoints.x <= area1[1]
            && indexPoints.y <= area1[2]
            && indexPoints.x >= area1[3]) 
            {
            button1.activated();
            backColor = [100,155,100];
            if (curStyle !== Style1) {
                curStyle = Style1;
            }
            console.log(curStyle);
        }
    }
    // Button 2 activation and action
    if (indexPoints != null) {
        if (indexPoints.y >=  area2[0] 
            && indexPoints.x <= area2[1]
            && indexPoints.y <= area2[2]
            && indexPoints.x >= area2[3]) 
            {
            button2.activated();
            backColor = [100,155,155];
            if (curStyle !== Style2) {
                curStyle = Style2;
            }
            console.log(curStyle);
        }
    }
    // Button 3 activation and action
    if (indexPoints != null) {
        if (indexPoints.y >=  area3[0] 
            && indexPoints.x <= area3[1]
            && indexPoints.y <= area3[2]
            && indexPoints.x >= area3[3]) 
            {
            button3.activated();
            backColor = [100,100,155];
            if (curStyle !== Style3) {
                curStyle = Style3;
            }
            console.log(curStyle);
        }
    }
}

//--------------------------------------//
//--------------Mediapipe---------------//
//--------------------------------------//
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