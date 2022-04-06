import Style from "./style.js";
export default class Style1 extends Style {
    constructor(x, y) {
        super(x,y);
    }

    update() {
        
    }

    draw() {
        push();
            noFill();
            stroke(255,0,0);
            strokeWeight(10);
            ellipse(this.x, this.y, 20);
        pop();
    }
}