const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');
let width = 1280;
let height = 720;
let palmList = [];
let fingerList = [];

// Mediapipe Stuff //
function onResults(results) {
    pointList = [];
    currentHands = null;
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
        results.image, 0, 0, canvasElement.width, canvasElement.height);
    if (results.multiHandLandmarks) {
        if (results.multiHandLandmarks.length != 0) {
            //arrayList.push(results.multiHandLandmarks);
            currentHands = results.multiHandLandmarks;
        }

        for (const landmarks of results.multiHandLandmarks) {
            drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
                        {color: '#FFFFFF', lineWidth: 5});
            drawLandmarks(canvasCtx, landmarks, {color: '#FFFFFF', lineWidth: 2});
            //pointList.push(landmarks);
            var palm = [0,1,5,9,13,17];

            for (i = 0; i < landmarks.length; i++) {
              var isPalm = palm.indexOf(i);
              var next;
              var v = ["Landmark " + [i], landmarks[i].x*100, landmarks[i].y*100, landmarks[i].z*100];
              if (isPalm == -1) {
                fingerList.push(v + "    ");
                  //next = landmarks[j-1];
              } else {
                palmList.push(v + "    ");
                  //next = landmarks[palm[(isPalm+1)%palm.length]];
              }
            }
            //pointList = landmarks.x;
            print(landmarks);
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
    minTrackingConfidence: 0.5
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

function setup() {
    createCanvas(width, height);
}

function draw() {
    
}

(function () {
    var textFile = null,
      makeTextFile = function (text) {
        var data = new Blob([text], {type: 'text/plain'});
    
        // If we are replacing a previously generated file we need to
        // manually revoke the object URL to avoid memory leaks.
        if (textFile !== null) {
          window.URL.revokeObjectURL(textFile);
        }
    
        textFile = window.URL.createObjectURL(data);
    
        return textFile;
      };
    
    
      var create = document.getElementById('create');
    
      create.addEventListener('click', function () {
        var link = document.getElementById('downloadlink');
        link.href = makeTextFile(pointList);
        link.style.display = 'block';
      }, false);
    })();