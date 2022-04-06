import Style from "./style.js";
export default class Style2 extends Style {
    constructor(x, y) {
        super(x,y);
    }

    update() {

    }

    draw() {
        push();
            noFill();
            stroke(0,0,255);
            strokeWeight(1);
            ellipse(this.x, this.y, 20);
        pop();
    }
}