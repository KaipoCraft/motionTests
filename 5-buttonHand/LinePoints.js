export default class LinePoints {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw() {
        ellipse(this.x, this.y, 100);
    }
    getVector() {
        let v = createVector(this.x, this.y);
        return (v);
    }

    update() {
        this.x += 10;
    }

    finished() {
        return this.x >= width + 20;
    }
}