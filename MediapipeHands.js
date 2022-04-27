// Troubleshooting -
// Can't seem to change "indeTipPoints" in the rest of code
// Scope issue?

export default class Mediapipe {
    constructor() {
        this.indexTipPoint = [];
        this.thumbTipPoint = [];
        this.handThickness = 4;
    }

    runMediapipe() {
        window.onResults = (results) => {
            if (results.multiHandLandmarks) {
                for (const landmarks of results.multiHandLandmarks) {
                    push();
                    let c = color(250,250,250);
                    let i = 0;
        
                    do {
                        fill(c);
                        let x = landmarks[i].x*width;
                        let y = landmarks[i].y*height;
                        let z = landmarks[i].z;
                        ellipse(x,y,this.handThickness);
                        i++
                    }
                    while (i < landmarks.length);
        
                    stroke(c);
                    strokeWeight(this.handThickness+1);
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
                   
                    this.indexTipPoint = landmarks[8];
                    this.thumbTipPoint = landmarks[4];

                    pop();
                }
            }
        }
    }

    get index() {
        return this.indexTipPoint;
    }
    get thumb() {
        return this.thumbTipPoint;
    }
}