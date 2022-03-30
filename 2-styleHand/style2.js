export default class style2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
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