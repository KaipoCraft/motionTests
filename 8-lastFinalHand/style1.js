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
        this.linePoint;
    }

    // Draws lines that sweep across the screen in a ribbon-like pattern
    draw() {
        noFill();
        beginShape();
        // Runs through the list of previous detected points
        for (let i = 0; i < this.pointList.length; i++) {
            // Runs through each detected hand
            for (let j = 0; j < this.pointList[i].length; j++) {
                    this.linePoint = new LinePoints(this.pointList[i][j], this.lifespan);
                    this.linePoint.draw();
                    this.linePoint.update();
            }
        }
        endShape();

    }

    update() {
        // These objects aren't in a list so splice won't work
        if (this.linePoint.finished()) {
            //console.log(this.linePoint);
        }
        // for (let i = this.linePoint.length - 1; i >= 0; i--) {
        //     console.log(this.linePoint[i]);
        //     if (this.linePoint[i].finished()) {
        //         this.linePoint.splice(i, 1);
        //     }
        // }
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