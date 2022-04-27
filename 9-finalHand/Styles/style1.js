import LinePoints from "./linePoints.js";
export default class Style1 {
    constructor(point) {
        this.index = point;

        this.linePoints = [];
        this.thickness = 1;
        this.xoff = 0;
        this.amp = 20;
        this.linePoint;
        this.background = [0,0,255];
    }

    // Draws lines that sweep across the screen in a ribbon-like pattern
    draw() {
        noFill();
        beginShape();
        
        if (this.index != null) {

            this.linePoints.push(new LinePoints(this.index));

            for (let curPoint = 0; curPoint < this.linePoints.length; curPoint++) {
                this.linePoints[curPoint].draw();
                this.linePoints[curPoint].update();
                if (this.linePoints[curPoint].finished()) {
                    this.linePoints.splice(curPoint, 1);
                }
            }
            // for (let i = 0; i < this.linePoints; i++) {
            //     console.log(this.linePoints[i]);
            // }
            
        }

        endShape();
    }

    set indexPoint(point) {
        // if (point != null) {
        //     this.indexPoint = point;
        this.index = point;
        // }
    }

}