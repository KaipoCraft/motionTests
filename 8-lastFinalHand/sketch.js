// Make a setter function for the objects
// Make the styles a part of an array
// Buttons change which style is in effect in array

import Pointer from "./indexPointer.js";
import Button from "./button.js";
import Style1 from "./style1.js";
import Style2 from "./style2.js";
import Style3 from "./style3.js";

const videoElement = document.getElementsByClassName('input_video')[0];

let width = 1280;               // Width of the canvas
let height = 720;               // Height of the canvas
let c;                          // Hand Line Color
let button1, button2, button3;
let indexPoints = [0, 0];
let btnMargin = 30;
let backColor = [155,100,100];
let CurStyle = Style1;
let drawStyle;
let pointer;

//--------------------------------------//
//--------------P5 Setup----------------//
//--------------------------------------//
window.setup = function() {
    createCanvas(width, height);
    c = color(250,250,250);
    pointer = new Pointer(indexPoints.x, indexPoints.y);
    drawStyle = new CurStyle(indexPoints, width, height);
}

//--------------------------------------//
//---------------P5 Draw----------------//
//--------------------------------------//
window.draw = function() {

    
    background(backColor);
    if (indexPoints != null) {
        pointer.updatePoint = indexPoints;
        pointer.draw();

        drawStyle.updatePoint = indexPoints;
        drawStyle.draw();
    }

    //--------------------------------------//
    //---------------Buttons----------------//
    //--------------------------------------//

        button1 = new Button(btnMargin, btnMargin, 'Style 1');
        let area1 = button1.getArea();
        button2 = new Button(btnMargin, area1[2]+btnMargin, 'Style 2');
        let area2 = button2.getArea();
        button3 = new Button(btnMargin, area2[2]+btnMargin, 'Style 3');
        let area3 = button3.getArea();

        // Button 1 activation and action
        if (indexPoints != null) {
            if (indexPoints.y >=  area1[0] 
                && indexPoints.x <= area1[1]
                && indexPoints.y <= area1[2]
                && indexPoints.x >= area1[3]) 
                {
                button1.activated();
                backColor = [100,155,100];
                if (CurStyle !== Style1) {
                    CurStyle = Style1;
                }
                console.log(CurStyle);
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
                if (CurStyle !== Style2) {
                    CurStyle = Style2;
                }
                console.log(CurStyle);
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
                if (CurStyle !== Style3) {
                    CurStyle = Style3;
                }
                console.log(CurStyle);
            }
        }
        indexPoints = [];
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
            
            //for (let hand in results.multiHandLandmarks) {
                //print(hand);
                indexPoints.push(createVector(landmarks[8].x*width, landmarks[8].y*height));
            //}
            
            // indexPointList.push(indexPoints);
            //new IndexPointer(indexPoints.x, indexPoints.y).draw();
        }
        if (indexPoints.x <= width/3) {
            button1.draw();
            button2.draw();
            button3.draw();
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