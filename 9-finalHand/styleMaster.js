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
        //console.log(this.pointList);
    }

    changeStyle() {
        console.log(this.curStyle);
        if (this.curStyle = Style1) {
            this.curStyle = Style2;
        } else if (this.curStyle = Style2) {
            this.curStyle = Style3;
        } else {
            this.curStyle = Style1;
        }
    }

    /**
     * @param {any} x
     */
     set updatePoint(point) {
        if (point[0] != null) {
            this.pointList.push(point);
        }
    }

    get styleNum() {
        return this.styles.length;
    }
}