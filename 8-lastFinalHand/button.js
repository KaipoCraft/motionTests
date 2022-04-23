export default class Button {
    // Takes x coordinate, y coordinate, and label as a string
    constructor(x, y, label) {
        this.x = x;
        this.y = y;
        this.width = 200;
        this.height = 200;
        this.color = [255];
        this.thickness = 5;
        this.label = label;
    }

    draw() {
        push();
            stroke(this.color);
            strokeWeight(this.thickness);
            fill(255, 75);
            rect(this.x, this.y, this.width, this.height);

            // Label
            translate(this.x, this.y);
            textSize(20);
            noStroke();
            fill(this.color);
            textAlign(CENTER, CENTER);
            translate(this.width/2, this.height+15);
            scale(-1,1);
            text(this.label, 0, 0);
        pop();
    }

    getArea() {
        // returns the edges of the button
        let topEdge = this.y
        let leftEdge = this.x + this.width
        let btmEdge = this.y + this.height
        let rightEdge = this.x
        let a = [topEdge, leftEdge, btmEdge, rightEdge];
        return a;
    }

    activated() {
        fill(0);
        noStroke();
        rect(this.x, this.y, this.width, this.height);
    }
}