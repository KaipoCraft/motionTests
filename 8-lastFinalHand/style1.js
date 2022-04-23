import LinePoints from "./LinePoints.js";
export default class Style1 {
    constructor(point, width, height) {
        this.point = point;
        this.width = width;
        this.height = height;

        this.pointList = [];
        this.lifespan = 200;
        this.thickness = 1;
        this.xoff = 0;
        this.amp = 20;
    }

    // Draws lines that sweep across the screen in a ribbon-like pattern
    draw() {
        noFill();
        beginShape();
        // Runs through the list of previous detected points
        for (let i = 0; i < this.pointList.length; i++) {
            // Runs through each detected hand
            for (let j = 0; j < this.pointList[i].length; j++) {
                //ellipse(this.pointList[i][j].x, this.pointList[i][j].y, 100);
                vertex(this.pointList[i][j].x, this.pointList[i][j].y);
            }
        }
        endShape();

        // for (let i = particles.length - 1; i >= 0; i--) {
        //     if (particles[i].finished()) {
        //       particles.splice(i, 1);
        //     }
        // }
    }

    update() {
        // Runs through the list of previous detected points
        for (let i = 0; i < this.pointList.length; i++) {
            // Runs through each detected hand
            for (let j = 0; j < this.pointList[i].length; j++) {
                if (this.pointList[i][j].x != null) {
                    this.pointList[i][j].x += 10;
                    print(this.pointList[i][j].x);
                }
            }
        }

        this.lifespan -= 10;
    }

    finished() {
        return this.lifespan < 0;
    }

    /**
     * @param {any} x
     */
     set updatePoint(point) {
        if (point[0] != null) {
            this.pointList.push(point);
        }
    }
}