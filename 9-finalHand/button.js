export default class Button {
    // Takes x coordinate, y coordinate, and label as a string
    constructor(point, btnNum, label) {
        this.point = point;
        this.btnNum = btnNum;
        this.width = 500/btnNum;
        this.height = 500/btnNum;
        this.color = [255];
        this.thickness = 5;
        this.label = label;
        this.active = false;
    }

    draw() {
        push();
            stroke(this.color);
            strokeWeight(this.thickness);
            fill(255, 75);
            rect(this.point.x, this.point.y, this.width, this.height);

            // Label
            translate(this.point.x, this.point.y);
            textSize(20);
            noStroke();
            fill(this.color);
            textAlign(CENTER, CENTER);
            translate(this.width/2, this.height-15);
            scale(-1,1);
            text(this.label, 0, 0);
        pop();
    }

    get area() {
        // returns the edges of the button
        let topEdge = this.point.y
        let leftEdge = this.point.x + this.width
        let btmEdge = this.point.y + this.height
        let rightEdge = this.point.x
        let a = [topEdge, leftEdge, btmEdge, rightEdge];
        return a;
    }

    get btnStatus() {

    }

    activated() {
        fill(0);
        noStroke();
        rect(this.point.x, this.point.y, this.width, this.height);
    }
}