export default class Ripple {
    constructor(cols, rows, x, y, dampening, current, previous) {
        this.cols = cols;
        this.rows = rows;
        this.x = x;
        this.y = y;
        this.dampening = dampening;
        this.lifetime = 100;
        this.current = current;
        this.previous = previous;
    }

    finished() {
      return this.lifetime < 0;
    }

    draw() {
      loadPixels();
      for (let i = 1; i < this.cols - 1; i++) {
        for (let j = 1; j < this.rows - 1; j++) {
          this.current[i][j] =
            (this.previous[i - 1][j] +
              this.previous[i + 1][j] +
              this.previous[i][j - 1] +
              this.previous[i][j + 1]) /
              2 -
              this.current[i][j];
            this.current[i][j] = this.current[i][j] * this.dampening;
          // Unlike in Processing, the pixels array in p5.js has 4 entries
          // for each pixel, so we have to multiply the index by 4 and then
          // set the entries for each color component separately.
          let index = (i + j * this.cols) * 4;
          pixels[index + 0] = this.current[i][j];
          pixels[index + 1] = this.current[i][j];
          pixels[index + 2] = this.current[i][j];
        }
      }
      updatePixels();
      
      let temp = this.previous;
      this.previous = this.current;
      this.current = temp;
    }

    update() {
      this.lifetime -= 10;
    }
}