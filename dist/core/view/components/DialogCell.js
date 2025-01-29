"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gsap_1 = require("gsap");
const pixi_js_1 = require("pixi.js");
class DialogCell extends pixi_js_1.Container {
    constructor(text, author, width, avatarUri = "", align = "left") {
        super();
        this.cellPosition = "";
        this.cellPosition = align;
        const message = new pixi_js_1.Text(text, {
            fontFamily: "Arial",
            fontSize: 18,
            fill: 0x000000,
            wordWrap: true,
            align: (align == "left") ? "left" : "right",
            wordWrapWidth: width,
        });
        message.anchor.set(0, 0);
        message.x = 10;
        message.y = 10;
        const background = new pixi_js_1.Graphics();
        background.beginFill(0xffffff);
        background.drawRect(0, 0, width + 20, message.height + 20);
        background.endFill();
        this.addChild(background);
        this.addChild(message);
        if (avatarUri != "") {
            const personTexture = pixi_js_1.Texture.from(avatarUri);
            const personSprite = new pixi_js_1.Sprite(personTexture);
            personSprite.scale.set(0.5, 0.5);
            personSprite.anchor.set(0, 1);
            this.addChild(personSprite);
        }
        else {
            const title = new pixi_js_1.Text(author, {
                fontFamily: "Arial",
                fontSize: 12,
                fill: 0xFF8800,
                wordWrap: true,
                align: "left",
                wordWrapWidth: width,
            });
            const bgTitle = new pixi_js_1.Graphics();
            bgTitle.beginFill(0xffffff);
            bgTitle.drawRect(0, 0, title.width + 20, title.height);
            bgTitle.endFill();
            bgTitle.y -= bgTitle.height;
            title.anchor.set(0, 1);
            this.addChild(bgTitle);
            this.addChild(title);
        }
        gsap_1.default.fromTo(this, { alpha: 0 }, { duration: 0.5, alpha: 1 });
    }
}
exports.default = DialogCell;
