export default class LinePoints {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.pointList = [];
    }

    draw() {
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