export default class LinePoints {
    constructor(point, width, height, lifespan) {
        this.point = point;
        this.width = width;
        this.height = height;
        this.lifespan = lifespan;
    }

    draw() {
        if (this.point.x != null) {
            ellipse(this.point.x, this.point.y, 10);
            vertex(this.point.x, this.point.y);
        }
    }

    update() {
        if (this.point.x != null) {
            this.point.x += 10;
        }
    }

    finished() {
        return this.x >= width;
    }
}