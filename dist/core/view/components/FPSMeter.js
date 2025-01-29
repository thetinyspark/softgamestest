"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pixi_js_1 = require("pixi.js");
class FPSMeter extends pixi_js_1.Container {
    constructor(app) {
        super();
        const fpsText = new pixi_js_1.Text("", {
            fontFamily: "Arial",
            fontSize: 18,
            fill: 0xffffff,
            align: "center",
        });
        const background = new pixi_js_1.Graphics();
        background.beginFill(0x111111);
        background.drawRect(0, 0, 100, 30);
        background.endFill();
        fpsText.position.set(10, 10);
        this.addChild(background);
        this.addChild(fpsText);
        app.ticker.add(() => {
            fpsText.text = `FPS: ${Math.round(app.ticker.FPS)}`;
        });
    }
}
exports.default = FPSMeter;
