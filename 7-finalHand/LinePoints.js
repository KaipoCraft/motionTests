export default class LinePoints {
    constructor(x, y, width, height, lifespan) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.lifespan = lifespan;
    }

    draw() {
        ellipse(this.x, this.y, 100);
    }
    get vector() {
        let v = createVector(this.x, this.y);
        return (v);
    }

    update() {
        this.x += 10;
    }

    finished() {
        return this.x >= width;
    }
}