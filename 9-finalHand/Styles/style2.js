export default class Style2 {
    constructor(point) {
        this.index = point;
        
        this.cols = width; 
        this.rows = height;
        this.dampening = 1;
        this.current = new Array(this.cols).fill(0).map(n => new Array(this.rows).fill(0));
        this.previous = new Array(this.cols).fill(0).map(n => new Array(this.rows).fill(0));
        this.background = [255,0,0];
    }

    draw() {
        
        loadPixels();
        for (let i = 1; i < this.cols -1; i++) {
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
    }

    update() {
        
    }

}