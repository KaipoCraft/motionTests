// Make a setter function for the objects
// Make the styles a part of an array
// Buttons change which style is in effect in array

import Pointer from "./indexPointer.js";
import Button from "./button.js";
import StyleMaster from "./styleMaster.js";
import Style1 from "./style1.js";
import Style2 from "./style2.js";
import Style3 from "./style3.js";
import StyleMaster from "./styleMaster.js";

const videoElement = document.getElementsByClassName('input_video')[0];

let width = 1280;               // Width of the canvas
let height = 720;               // Height of the canvas
let c;                          // Hand Line Color
let button1, button2, button3;
let indexPoints = [0, 0];
let btnMargin = 30;
let backColor = [155,100,100];
let StyleList = [Style1, Style2, Style3];
let CurStyle = Style1;
let drawStyle;
let pointer;

//--------------------------------------//
//--------------P5 Setup----------------//
//--------------------------------------//
window.setup = function() {
    createCanvas(width, height);
    c = color(250,250,250);
    pointer = new Pointer(indexPoints);

    // Troubleshooting: need to make an object that holds all the styles
    // Then call function "changeStyle" when button is activated
    // This will make me able to create one instance of that object in here

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
        drawStyle.update();
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

        // Makes sure there is at least one hand detected
        if (indexPoints[0] != null)  {
            // Runs through each detected hand
            for (let i = 0; i < indexPoints.length; i++) {
                // If hand gets close to right side, show buttons
                if (indexPoints[i].x <= width/3) {
                    button1.draw();
                    button2.draw();
                    button3.draw();
                }

                if (indexPoints[i].y >=  area1[0] 
                    && indexPoints[i].x <= area1[1]
                    && indexPoints[i].y <= area1[2]
                    && indexPoints[i].x >= area1[3]) 
                    {
                    button1.activated();
                    backColor = [100,155,100];
                    if (CurStyle !== Style1) {
                        CurStyle = Style1;
                    }
                    console.log(CurStyle);
                }

                if (indexPoints[i].y >=  area2[0] 
                    && indexPoints[i].x <= area2[1]
                    && indexPoints[i].y <= area2[2]
                    && indexPoints[i].x >= area2[3]) 
                    {
                    button2.activated();
                    backColor = [100,155,155];
                    if (CurStyle !== Style2) {
                        CurStyle = Style2;
                    }
                    console.log(CurStyle);
                }

                if (indexPoints[i].y >=  area3[0] 
                    && indexPoints[i].x <= area3[1]
                    && indexPoints[i].y <= area3[2]
                    && indexPoints[i].x >= area3[3]) 
                    {
                    button3.activated();
                    backColor = [100,100,155];
                    if (CurStyle !== Style3) {
                        CurStyle = Style3;
                    }
                    console.log(CurStyle);
                }
            }
        } else {
            // Troubleshooting: text won't show when flipped
            push();
                    scale(-1,1);
                    translate(width/2, height/2);
                    textSize(30);
                    fill(255);
                    text('Show Hands', 0, 0);
            pop();
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

            indexPoints.push(createVector(landmarks[8].x*width, landmarks[8].y*height));

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