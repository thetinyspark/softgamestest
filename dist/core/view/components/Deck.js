"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pixi_js_1 = require("pixi.js");
const gsap_1 = require("gsap");
class Deck extends pixi_js_1.Container {
    constructor(durationTime = 2.0) {
        super();
        this.durationTime = durationTime;
    }
    destroy() {
        this.children.forEach((current) => {
            gsap_1.default.killTweensOf(current);
        });
        this.removeChildren();
    }
    getTopCard() {
        return this.getChildAt(this.children.length - 1);
    }
    addCard(card) {
        this.addChild(card);
        gsap_1.default.fromTo(card, {
            rotation: 0,
            x: card.x - this.x,
            y: card.y - this.y,
        }, {
            rotation: Math.PI * 4,
            x: 0,
            y: (this.children.length * 4),
            duration: this.durationTime,
        });
    }
}
exports.default = Deck;
