import Style from "./style.js";
export default class style1 extends Style {
    constructor(x, y) {
        super(x, y);
    }

    update() {
        
    }

    draw() {
        push();
            noFill();
            stroke(255,0,255);
            strokeWeight(5);
            ellipse(this.x, this.y, 20);


        pop();
    }

    finish() {
        
    }
}