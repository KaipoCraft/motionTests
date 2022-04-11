export default class Branch {
    constructor(p1,p2) {
        this.p1 = p1;
        this.p2 = p2;
    }

    draw() {
        stroke(255, 0, 20, 10);
        line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
    }

    branch() {
        var dir = p5.vector.sub(this.end, this.begin);
        dir.rotate(PI / 4);
        var newEnd = p5.Vector.add(this.end, dir);
        var right = new Branch(this.end, newEnd);
        return right;
    }
}