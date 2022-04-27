export class IndexPointer {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = (0,0,0);
        this.angle = 0;
        this.setLineDash = function setLineDash(list) {
            drawingContext.setLineDash(list);
        }
    }

    draw() {
        push();
            strokeWeight(1);
            textFont("Oswald");
            textSize(30);
            text('index', this.x + 25, this.y - 25);
        pop();
        push();
            noFill();
            color(this.color);
            strokeWeight(3);
            this.setLineDash([6,10]);
            rotate(this.angle);
            translate(this.x, this.y);
            ellipse(0, 0, 50);
        pop();
    }

    update() {
        this.angle += 3;
    }
}