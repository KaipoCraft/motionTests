export default class LinePoints {
    constructor(point) {
        this.point = point;
        this.width = width;
        this.height = height;
        this.start = 0;
        this.y;
        this.inc = 0.01;
        this.xoff = 0;
        this.noise = map(noise(this.point.x), 0, 1, -5, 5);
    }

    draw() {
        console.log(this.point);
        if (this.point.x != null) {
            //ellipse(this.point.x, this.point.y, 20);
            vertex(this.point.x, this.point.y);
        }
    }

    update() {
        if (this.point.x != null) {

            this.point.x += 10;

            // this.calcNoise;
            // this.point.y += this.noise;
            // this.point.y += map(this.point.x, 0, width, -10, 10)
            //for (let x = this.point.x; x < this.point.length; )
        }
    }

    finished() {
        return this.point.x >= width + 20;
    }
}