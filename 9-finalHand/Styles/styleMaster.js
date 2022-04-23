import Style1 from "./style1.js";
import Style2 from "./style2.js";
import Style3 from "./style3.js";

export default class StyleMaster {
    constructor() {
        this.point;
        this.pointList = [];
        this.curStyle = Style1;
        this.styles = [Style1, Style2, Style3];
    }

    drawCurStyle() {
        let drawStyle = new this.curStyle(this.pointList);
        drawStyle.draw();
    }

    empty() {
        this.pointList.splice(0);
    }

    get styleNum() {
        return this.styles.length;
    }
    set updatePoint(point) {
        if (point[0] != null) {
            this.pointList.push(point);
        }
    }
    set updateStyle(newStyle) {
        if (this.curStyle != this.styles[newStyle-1]) {
            this.curStyle = this.styles[newStyle-1];
            console.log(this.curStyle);
        }
        
    }

}