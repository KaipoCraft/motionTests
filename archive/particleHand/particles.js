// Particle system from CodingTrain
export class Particle {
    constructor(x, y, d) {
      this.pos = createVector(x, y);
      this.vel = p5.Vector.random2D();
      this.vel.mult(random(0.5, 3));
      this.acc = createVector(0, 0);
      this.r = d;
      this.lifetime = 200;
    }
  
    finished() {
      return this.lifetime < 0;
    }
  
    applyForce(force) {
      this.acc.add(force);
    }
  
    edges() {
      if (this.pos.y >= height) {
        this.pos.y = height;
        this.vel.y *= -1;
      }
  
      if (this.pos.x >= width) {
        this.pos.x = width;
        this.vel.x *= -1;
      }
    }
  
    update() {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.set(0, 0);
  
      this.lifetime -= 10;
    }
  
    show() {
      stroke(240, 100, 100, this.lifetime);
      strokeWeight(2);
      fill(240, 100, 100, this.lifetime);
      //noFill();
  
      ellipse(this.pos.x, this.pos.y, this.r);
    }
}