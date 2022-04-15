const videoElement = document.getElementsByClassName('input_video')[0];
let width = 1280;
let height = 720;
let c;

window.setup = function() {
    createCanvas(width, height);
    c = (255);
}

window.draw = function() {
    background(220);
}

// Mediapipe Stuff //
window.onResults = function(results) {

    if (results.poseLandmarks) {
        print(results.poseLandmarks[1]);
        for (const landmarks of results.poseLandmarks) {
            let x = landmarks.x*width;
            let y = landmarks.y*height;
            stroke(c);
            strokeWeight(3);
            noFill();
            ellipse(x, y, 20);
        }
        //     let c = color(250,250,250);
        //     let i = 0;

        //     do {
        //         stroke(c);
        //         strokeWeight(3);
        //         noFill();
        //         let x = landmarks[i].x*width;
        //         let y = landmarks[i].y*height;
        //         let z = landmarks[i].z;
        //         ellipse(x,y,2);
        //         i++
        //     }
        //     while (i < landmarks.length);

            stroke(c);
            strokeWeight(2);
            var palm = [11, 12, 23, 24];
            for (var j = 0; j < results.poseLandmarks.length; j++) {
                let x = results.poseLandmarks[j].x*width;
                let y = results.poseLandmarks[j].y*height;

                var isPalm = palm.indexOf(j);
                var next;
                if (isPalm == -1) {
                    next = results.poseLandmarks[j-1];
                } else {
                   next = results.poseLandmarks[palm[(isPalm+1)%palm.length]];
                }

                line(x, y, next.x*width, next.y*height);
            }
        //}
    }
}

const pose = new Pose({locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
  }});
  pose.setOptions({
    modelComplexity: 1,
    smoothLandmarks: true,
    enableSegmentation: true,
    smoothSegmentation: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
  });
  pose.onResults(onResults);

const camera = new Camera(videoElement, {
    onFrame: async () => {
        await pose.send({image: videoElement});
    },
    width: 1280,
    height: 720
});
camera.start();