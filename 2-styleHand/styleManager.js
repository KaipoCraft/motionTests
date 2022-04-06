import Style1 from "./style1.js";
import Style2 from "./style2.js";
import Style3 from "./style3.js";

export default class StyleManager {
    constructor() {
        this.c = color(200, 225, 200);
    }

    // Getter
    getStyle() {
        return style;
    }

    // Setter
    setStyle(style) {
        this.style = style;
    }

    changeStyle() {
        if (this.style == Style1) {
            this.style = Style2;
            this.c = color(225, 200, 200);
        } else if (this.style == Style2) {
            this.style = Style3;
            this.c = color(200, 200, 225);
        } else {
            this.style = Style1;
            this.c = color(200, 225, 200);
        }
    }
}