import Style1 from "./style1.js";
import Style2 from "./style2.js";
import Style3 from "./style3.js";
const videoElement = document.getElementsByClassName('input_video')[0];
let width = 1280;
let height = 720;

// Declare list to capture points
let pointList = []
let button;
let val;
let Style;

window.setup = function() {
    createCanvas(width, height);
    button = createButton('click me');
    button.position(width-100,height-15);
    
    val = 255;
    Style = Style1;
}

function changeStyle() {
  val = random(255);
  if (Style = Style1) {
      Style = Style2;
  } else if (Style = Style2) {
      Style = Style3;
  } else {
      Style = Style1;
  }
}


window.draw = function() {
    background(0, 0, val);
    button.mousePressed(changeStyle);
}

// Mediapipe Stuff //
window.onResults = function(results) {
    if (results.multiHandLandmarks) {
        for (const landmarks of results.multiHandLandmarks) {
            pointList = [];
            let c = color(250,250,250);
            let i = 0;

            do {
                stroke(c);
                strokeWeight(3);
                noFill();
                let x = landmarks[i].x*width;
                let y = landmarks[i].y*height;
                let z = landmarks[i].z;
                ellipse(x,y,2);
                pointList.push(new Style(x,y)); 
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