// Style 3 is a particle system that releases particles from the hand
import Particle from "./particles.js";
export default class Style3 {
    constructor(pointList) {
        this.pointList = pointList;
        this.particleList = [];
    }

    draw() {
        for (let i = 0; i < this.pointList.length; i++) {
            let lifetime = 200;
            this.particleList.push(new Particle(this.pointList[i], lifetime));
        }

        for (let j = 0; j < this.particleList.length; j++) {
            this.particleList[j].draw();
            this.particleList[j].update();
        }
    }

    update() {
        
    }
}