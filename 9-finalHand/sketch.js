// Make a setter function for the objects
// Make the styles a part of an array
// Buttons change which style is in effect in array

import Pointer from "./pointer.js";
import Button from "./button.js";
import StyleMaster from "./styleMaster.js";

const videoElement = document.getElementsByClassName('input_video')[0];

let width = 1280;               // Width of the canvas
let height = 720;               // Height of the canvas
let c;                          // Hand Line Color
let indexPoints = [];
let backColor = [155,100,100];
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

    drawStyle = new StyleMaster(indexPoints);
}

//--------------------------------------//
//---------------P5 Draw----------------//
//--------------------------------------//
window.draw = function() {

    background(backColor);

    pointer.draw();
    pointer.updatePoint = indexPoints;

    // Makes button to change between styles
    for (let i = 1; i <= drawStyle.styleNum; i++) {
        //ellipse(width/4, height/(drawStyle.styleNum+1)*i, 50);
        let btnMargin = 20;
        let btnX = 0 + btnMargin;
        let btnY = height/(drawStyle.styleNum)*(i-1) + btnMargin;
        
        let btnPoint = createVector(btnX, btnY);
        let btn = new Button(btnPoint, drawStyle.styleNum,'Style ' + i);
        btn.draw();

        for (let j = 0; j < indexPoints.length; j++) {
            if (indexPoints[j].y >= btn.area[0]
                && indexPoints[j].x <= btn.area[1]
                && indexPoints[j].y <= btn.area[2]
                && indexPoints[j].x >= btn.area[3]) 
            {
                console.log("Button " + i + " pressed!");
                btn.activated();
                let newStyle = i;
                drawStyle.updateStyle = newStyle;
            }
        }
    }
    
    drawStyle.drawCurStyle();
    drawStyle.updatePoint = indexPoints;

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