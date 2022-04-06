import Style from "./style.js";
import Style1 from "./style1.js";
import Style2 from "./style2.js";
import Style3 from "./style3.js";
//import { Background } from "./background.js";
const videoElement = document.getElementsByClassName('input_video')[0];
let width = 1280;
let height = 720;

// Declare list to capture points
let pointList = [];
let button;
let currentStyle;
let c;

window.setup = function() {
    createCanvas(width, height);
    button = createButton('click me');
    button.position(width-100,height-15);
    button.mousePressed(changeStyle);
    
    currentStyle = Style1;
    c = color(200, 225, 200);
}

// Background is seperate object?
// Breakup different elements
// Ever present particle system?
// Logo Ever present?
// UI elements ever-present?

// Maybe background changes to dark mode when style chanegs to style 3
// Global state object that checks for the current style
// Style checks global state object (long term strategy)
// event emitting, global state management
// global - object that stores booleans, strings, objects - any object can check with global if it should do a function
// Add sound to the change
// Boolean = variable1 == variable2 (Will return true or false)
function changeStyle() {
  if (currentStyle == Style1) {
      currentStyle = Style2;
      c = color(225, 200, 200);
  } else if (currentStyle == Style2) {
      currentStyle = Style3;
      c = color(200, 200, 225);
  } else {
      currentStyle = Style1;
      c = color(200, 225, 200);
  }
}


window.draw = function() {
    //new Background(color).draw();
    background(c);
}

// Mediapipe Stuff //
window.onResults = function(results) {
    if (results.multiHandLandmarks) {
        for (const landmarks of results.multiHandLandmarks) {
            pointList = [];
            let c2 = color(250,250,250);
            let i = 0;

            do {
                stroke(c2);
                strokeWeight(3);
                noFill();
                let x = landmarks[i].x*width;
                let y = landmarks[i].y*height;
                let z = landmarks[i].z;
                ellipse(x,y,2);
                pointList.push(new currentStyle(x,y)); 
                i++
            }
            while (i < landmarks.length);
            
            stroke(c2);
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

            for (let point of pointList) {
                if (point != null) {
                    point.draw();
                }
            }
                       
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