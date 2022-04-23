export default class Style3 {
    constructor(pointList, width, height) {
        this.pointList = pointList;
        this.width = width;
        this.height = height;
    }

    draw() {
        push();
        for (let i = 0; i < this.pointList.length; i++) {
            print(this.pointList[i].x);
            noFill();
            stroke(0, 255, 0);
            ellipse(this.pointList[i].x, this.pointList[i].y, 50);
        }
        pop();
    }

    update() {
        
    }
}