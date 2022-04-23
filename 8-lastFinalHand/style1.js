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
                    let linePoint = new LinePoints(this.pointList[i][j], this.width, this.height, this.lifespan);
                    linePoint.draw();
                    linePoint.update();
            }
        }
        endShape();

    }

    update() {

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