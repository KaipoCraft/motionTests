export default class style1 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
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
}