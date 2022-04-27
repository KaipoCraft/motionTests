import Style1 from "./style1.js";
import Style2 from "./style2.js";
import Style3 from "./style3.js";

export default class StyleMaster {
    constructor() { 
        this.indexPoint;
        this.thumbPoint;
        
        this.styles = [new Style1(this.indexPoint), new Style2(this.indexPoint), new Style3(this.indexPoint)];
        this.curStyle = this.styles[0];
    }

    drawCurStyle() {
        this.curStyle.draw();
        this.curStyle.indexPoint = this.indexPoint;
    }

    empty() {
        this.indexPointList.splice(0);
    }

    get styleNum() {
        return this.styles.length;
    }
    get current() {
        return this.curStyle;
    }
    set updateIndexPoint(point) {
        this.indexPoint = point;
    }
    set updateThumbPoint(point) {
        if (point[0] != null) {
            this.thumbPoint = point;
        }
    }
    set setStyleIndex(i) {
        this.curStyle = this.styles[i];
    }

}