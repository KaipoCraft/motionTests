// Neill Kaipo Shikada
// ATLAS Institute
// University of Colorado Boulder

import Pointer from "./UI/pointer.js";
import Button from "./UI/button.js";
import StyleMaster from "./Styles/styleMaster.js";
import Mediapipe from "../MediapipeHands.js";
import { scalePoints } from "./functions.js";

const videoElement = document.getElementsByClassName('input_video')[0];

let width = 1280;               // Width of the canvas
let height = 720;               // Height of the canvas
let c;                          // Hand Line Color

let backColor;
let drawStyle;
let pointer;
let mp = new Mediapipe();
let indexPoints = [];
let thumbPoints = [];

//--------------------------------------//
//--------------P5 Setup----------------//
//--------------------------------------//
window.setup = function() {
    createCanvas(width, height);

    // Declare all colors
    backColor = color(100,100,110);
    c = color(250,250,250);

    pointer = new Pointer(indexPoints);

    drawStyle = new StyleMaster(indexPoints);
}

//--------------------------------------//
//---------------P5 Draw----------------//
//--------------------------------------//
window.draw = function() {
    indexPoints = scalePoints(mp.index);
    thumbPoints = scalePoints(mp.thumb);

    background(backColor);
    if (drawStyle.styleBackground != null) {
        background(drawStyle.styleBackground);
    }

    pointer.draw();
    pointer.updatePoint = indexPoints;

    // Makes button to change between styles
    for (let i = 1; i <= drawStyle.styleNum; i++) {

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
                
                drawStyle.empty();
                //let newStyle = i;
                //drawStyle.updateStyle = newStyle;
                drawStyle.setStyleIndex = i;
                
            }
        }
    }
    
    drawStyle.drawCurStyle();
    drawStyle.updateIndexPoint = indexPoints;
    drawStyle.updateThumbPoint = thumbPoints;

    indexPoints = [];
}

//--------------------------------------//
//--------------Mediapipe---------------//
//--------------------------------------//

mp.runMediapipe();

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