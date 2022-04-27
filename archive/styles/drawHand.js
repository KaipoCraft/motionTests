export function drawHand(landmarks, color) {
    // Draw circles at the landmarks
    let i=0;
    
    do {
        stroke(color);
        strokeWeight(3);
        noFill();
        let x = landmarks[i].x*width;
        let y = landmarks[i].y*height;
        let z = landmarks[i].z;
        ellipse(x,y, 10);
        i++
    } 
    while (i < landmarks.length);

    // Draw lines connecting the landmarks
    stroke(color);
    strokeWeight(3);
    var palm = [0,1,5,9,13,17];                     // Landmark indices that make up the palm
    for (var j = 0; j < landmarks.length; j++) {                 
        let x = landmarks[j].x*width;                // finds the coordinates in space
        let y = landmarks[j].y*height;

        var isPalm = palm.indexOf(j);               // Finds out if it's a palm landmark
        var next;                                   // Sets up who to connect with
        if (isPalm == -1) {                         // Connect with previous finger landmark
            next = landmarks[j-1];
        } else {                                    // Connect with next palm landmark
            next = landmarks[palm[(isPalm+1)%palm.length]];
        }

        line(x, y, next.x*width, next.y*height);
    }
}