const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');

// --------------------------- Setup the Canvas to Draw --------------------------------------- //
function setup() {
    
    createCanvas(1280, 720);
    
}
        
function onResults(results) {

    background(250, 200, 200);

    if (results.multiHandLandmarks) {
        for (const landmarks of results.multiHandLandmarks) {
// -------------------------- Draw the hands using p5.js -------------------------------------- //
            // Draw circles at the landmarks
            let i=0;
            let c = color(240, 100, 100);
            fill(c);
            do {
                noStroke();
                let x = landmarks[i].x*1280;
                let y = landmarks[i].y*720;
                let z = landmarks[i].z;
                ellipse(x,y, 10);
                i++
            } 
            while (i < landmarks.length);

            // Draw lines connecting the landmarks
            stroke(c);
            strokeWeight(10);
            var palm = [0,1,5,9,13,17];                     // Landmark indices that make up the palm
            for (var j = 0; j < landmarks.length; j++) {                 
                let x = landmarks[j].x*1280;                // finds the coordinates in space
                let y = landmarks[j].y*720;

                var isPalm = palm.indexOf(j);               // Finds out if it's a palm landmark
                var next;                                   // Sets up who to connect with
                if (isPalm == -1) {                         // Connect with previous finger landmark
                    next = landmarks[j-1];
                } else {                                    // Connect with next palm landmark
                    next = landmarks[palm[(isPalm+1)%palm.length]];
                }

                line(x, y, next.x*1280, next.y*720);
            }
        }
    }
    canvasCtx.restore();

    
}

const hands = new Hands({locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
}});
hands.setOptions({
    maxNumHands: 3,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.8
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