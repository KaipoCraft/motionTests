export default class LinePoints {
    constructor(point, lifespan) {
        this.point = point;
        this.width = width;
        this.height = height;
        this.lifespan = lifespan;
        this.start = 0;
        this.y;
        this.inc = 0.01;
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

            //this.point.y += random(-5, 5);
        }
    }

    finished() {
        return this.point.x >= width;
    }

    // Make a function to calculate the perlin noise value
    // for each point. 
    calcNoise() {

    }
}