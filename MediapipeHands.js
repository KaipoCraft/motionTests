export default class Mediapipe {
    constructor() {
    }

    runMediapipe() {
        window.onResults = function(results) {
            if (results.multiHandLandmarks) {
                for (const landmarks of results.multiHandLandmarks) {
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
                }
            }
        }
    }
}