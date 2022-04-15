export default class IndexPointer {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        // this.color = c;
        this.angle = 0;
        this.r = 25;
    }

    setLineDash(list) {
        drawingContext.setLineDash(list);
    }

    draw() {
        push();
            strokeWeight(1);
            textSize(30);
            translate(this.x - this.r, this.y - this.r);
            scale(-1,1);
            text('index', 0, 0);
        pop();
        push();
            noFill();
            color(255);
            // color(this.color);
            strokeWeight(3);
            this.setLineDash([6,10]);
            translate(this.x, this.y);
            rotate(this.angle);
            ellipse(0, 0, this.r*2);
        pop();
        this.update();
    }

    update() {
        this.angle += 3;
    }
}