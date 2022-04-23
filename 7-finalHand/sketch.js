// Make a list of points to feed the styles?
// How to make one instance of the object and keep adding to it?
// Make object, it takes list of points 

import IndexPointer from "./indexPointer.js";
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
let indexPointList = [];
let btnMargin = 30;
let backColor = [155,100,100];
let curStyle = Style1;
let drawStyle;
let pointListMax = 100;
let pointLife = 200;

//--------------------------------------//
//--------------P5 Setup----------------//
//--------------------------------------//
window.setup = function() {
    createCanvas(width, height);
    c = color(250,250,250);
    // drawStyle = new curStyle(indexPoints.x, indexPoints.y, width, height);
}

//--------------------------------------//
//---------------P5 Draw----------------//
//--------------------------------------//
window.draw = function() {
    background(backColor);
    
    let listEnd = indexPointList.length;
    if (listEnd > pointListMax) {
        indexPointList = indexPointList.slice(listEnd-pointListMax, listEnd);
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

        if (drawStyle != null) {
            drawStyle.draw();
            drawStyle.update();

            print(drawStyle);
        }
}

//--------------------------------------//
//--------------Mediapipe---------------//
//--------------------------------------//
window.onResults = function(results) {
    if (results.multiHandLandmarks) {
        if (indexPoints.x <= width/3) {
            button1.draw();
            button2.draw();
            button3.draw();
        }
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
            
            indexPoints = createVector(landmarks[8].x*width, landmarks[8].y*height);
            indexPointList.push(indexPoints);
            new IndexPointer(indexPoints.x, indexPoints.y).draw();

            // Troubleshooting - keeps making new instance every loop, can't make list
            drawStyle = new curStyle(indexPointList, width, height, pointLife);
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