export class handPoints {
    constructor(x, y, r, lifetime) {
        this.v1 = createVector(x, y);
        this.r = r;
        this.lifetime = lifetime;
    }

    draw() {
        push();
        ellipse(this.v1.x, this.v1.y, this.r);
        strokeWeight(1);
        //line(this.v1.x, this.v1.y, this.v2.x, this.v2.y);
        pop();
    }

    update() {
        this.lifetime -= 5;
    }

    finished() {
        return this.lifetime < 0;
    }
}