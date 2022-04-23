import LinePoints from "./LinePoints.js";
export default class Style1 {
    constructor(pointList) {
        this.pointList = pointList;

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
        //     // Runs through each detected hand
            for (let j = 0; j < this.pointList[i].length; j++) {
                    this.linePoint = new LinePoints(this.pointList[i][j], this.lifespan);
                    this.linePoint.draw();
                    this.linePoint.update();
            }
        }
        endShape();
    }

    update() {
    }
}