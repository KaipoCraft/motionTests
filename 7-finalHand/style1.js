import LinePoints from "./LinePoints.js";
export default class Style1 {
    constructor(pointList, width, height, lifespan) {
        this.pointList = pointList;
        this.width = width;
        this.height = height;
        this.lifespan = lifespan;
        this.lineList = [];
        this.thickness = 1;
        this.xoff = 0;
        this.amp = 20;
    }

    // Draws lines that sweep across the screen in a ribbon-like pattern
    draw() {
        push();
        beginShape();
        for (let i = 0; i < this.pointList.length; i++) {
            noFill();
            stroke(0, 255, 255);
            vertex(this.pointList[i].x, this.pointList[i].y);
        }
        endShape();
        pop();
    }

    update() {
        for (let i = 0; i < this.pointList.length; i++) {
            this.pointList[i].x += 10;
            let flow = map(noise(this.xoff), 0, 1, -this.amp, this.amp);
            this.pointList[i].y += flow;
            this.xoff += 0.1;
        }
        
        this.lifespan -= 10;
    }

    finished() {
        return this.lifespan < 0;
    }
}