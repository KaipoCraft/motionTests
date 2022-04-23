import LinePoints from "./LinePoints.js";
export default class Style1 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.lineList = [];
        this.thickness = 1;
    }

    // Draws lines that sweep across the screen in a ribbon-like pattern
    draw() {
        // beginShape();
        // let xoff = 0;
        // ellipse(this.x, this.y, 100);
        // for (let i = 0; i < this.lineList.length; i++) {
        //     noFill();
        //     stroke(255);
        //     strokeWeight(this.thickness);
        //     let p = this.lineList[i].draw();
        //     vertex(p.x, p.y);
        //     this.lineList[i].update();
        //     if (this.lineList[i].finished()) {
        //         this.lineList.splice(i, 1);
        //     }
        //     xoff += 1;
        // }
        // endShape();
    }

    update() {
        this.lineList.push(new LinePoints(this.x, this.y));
        print(this.lineList);
    }
}