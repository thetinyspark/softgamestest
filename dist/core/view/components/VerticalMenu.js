"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pixi_js_1 = require("pixi.js");
const app_const_1 = require("../../ioc/app.const");
class VerticalMenu extends pixi_js_1.Container {
    constructor() {
        super();
        this._options = [];
        this._menuItems = [];
        this._options = ["Ace of Shadows", "Magic Words", "Phoenix Flame"];
        this._menuItems = [];
        this._createMenuItem = this._createMenuItem.bind(this);
        this._clickHandler = this._clickHandler.bind(this);
        this.getWidth = this.getWidth.bind(this);
        this.createMenu();
    }
    createMenu() {
        const menuWidth = 200;
        const fontSize = 24;
        const padding = 15;
        this._options.forEach((option, index) => {
            this._createMenuItem(option, index, menuWidth, fontSize, padding);
        });
    }
    getWidth() { return 200; }
    _createMenuItem(option, index, menuWidth, fontSize, padding) {
        const buttonText = new pixi_js_1.Text(option, {
            fontFamily: "Arial",
            fontSize: fontSize,
            fill: 0xffffff,
            align: "center",
        });
        buttonText.x = (menuWidth - buttonText.width) / 2;
        buttonText.y = index * (fontSize + padding);
        const buttonBackground = new pixi_js_1.Graphics();
        buttonBackground.beginFill(0x333333);
        buttonBackground.drawRect(0, 0, menuWidth, buttonText.height + 20);
        buttonBackground.endFill();
        buttonBackground.x = 0;
        buttonBackground.y = buttonText.y - 10;
        buttonBackground.interactive = true;
        buttonBackground.on("pointerover", () => {
            buttonBackground.beginFill(0x555555);
            buttonBackground.drawRect(0, 0, menuWidth, buttonText.height + 20);
            buttonBackground.endFill();
        });
        buttonBackground.on("pointerout", () => {
            buttonBackground.beginFill(0x333333);
            buttonBackground.drawRect(0, 0, menuWidth, buttonText.height + 20);
            buttonBackground.endFill();
        });
        buttonBackground.on("pointerdown", () => {
            this._clickHandler(index);
        });
        this.addChild(buttonBackground);
        this.addChild(buttonText);
        this._menuItems.push({ buttonText, buttonBackground });
    }
    _clickHandler(index) {
        if (index === 0)
            this.emit(app_const_1.default.GO_TO_CARDS_SCREEN);
        else if (index === 1)
            this.emit(app_const_1.default.GO_TO_DIALOG_SCREEN);
        else
            this.emit(app_const_1.default.GO_TO_FIRE_SCREEN);
    }
}
exports.default = VerticalMenu;
