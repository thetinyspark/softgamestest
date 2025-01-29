"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pixi_js_1 = require("pixi.js");
class Card extends pixi_js_1.Container {
    constructor(text = "", fontSize = 12, textColor = 0x000000, backgroundColor = 0xFFFFFF, width = 100, height = 60) {
        super();
        this.updated = false;
        this._background = new pixi_js_1.Graphics();
        this._text = new pixi_js_1.Text(text, {
            fontFamily: "Arial",
            fontSize: fontSize,
            fill: textColor,
            align: "center",
        });
        this._text.x = (width - this._text.width) / 2;
        this._text.y = (height - this._text.height) / 2;
        this.setText(text);
        this.setBackgroundColor(backgroundColor);
        this.setSize(width, height);
        this.addChild(this._border);
        this.addChild(this._background);
        this.addChild(this._text);
    }
    setText(newText) {
        this._text.text = newText;
        this._text.x = (this._background.width - this._text.width) / 2;
        this._text.y = (this._background.height - this._text.height) / 2;
    }
    setBackgroundColor(newColor) {
        this._background.clear();
        this._background.beginFill(newColor);
        this._background.drawRect(1, 1, this._background.width - 2, this._background.height - 2);
        this._background.endFill();
    }
    setSize(newWidth, newHeight) {
        this._background.clear();
        this._background.beginFill(this._background.tint);
        this._background.drawRect(1, 1, newWidth - 2, newHeight - 2);
        this._background.endFill();
        this._border = new pixi_js_1.Graphics();
        this._border.clear();
        this._border.beginFill(0x000000);
        this._border.drawRect(0, 0, newWidth, newHeight);
        this._border.endFill();
        this._text.x = (newWidth - this._text.width) / 2;
        this._text.y = (newHeight - this._text.height) / 2;
    }
    updateDepth() {
        this.updated = true;
        const parent = this.parent;
        parent.removeChild(this);
        parent.addChild(this);
    }
}
exports.default = Card;
