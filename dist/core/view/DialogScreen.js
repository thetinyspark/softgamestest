"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pixi_js_1 = require("pixi.js");
const DialogCell_1 = require("./components/DialogCell");
const gsap_1 = require("gsap");
class DialogScreen {
    constructor(_service, _repository) {
        this._service = _service;
        this._repository = _repository;
        this._dialogs = [];
        this._dialogIndex = 0;
        this._messages = [];
        this._container = new pixi_js_1.Container();
        this.addDialogContainer();
    }
    getContainer() {
        return this._container;
    }
    reset() {
        this.destroy();
        this.addBackground();
        this.addDialogContainer();
        this._dialogs = this._service.getAllDialogs();
        this._dialogIndex = 0;
        this._dialogContainer.y = 0;
        this._messages = [];
        clearTimeout(this._timeout);
        this.showNextMessage();
    }
    addBackground() {
        // add board
        const tex = pixi_js_1.Texture.from(this._repository.getOneBy("key", "texting").uri);
        const board = new pixi_js_1.Sprite(tex);
        board.scale.set(3, 3);
        this._container.addChild(board);
    }
    addDialogContainer() {
        this._dialogContainer = new pixi_js_1.Container();
        this._container.addChild(this._dialogContainer);
    }
    destroy() {
        gsap_1.default.killTweensOf(this._dialogContainer);
        clearInterval(this._timeout);
        this._container.removeChildren();
    }
    showNextMessage() {
        if (this._dialogIndex > this._dialogs.length - 1)
            return;
        const messageWidth = 200;
        const dialog = this._dialogs[this._dialogIndex];
        const character = this._service.getCharacterByDialog(dialog);
        const align = (character) ? character.position : "left";
        const uri = (character) ? character.avatar : "";
        const cell = new DialogCell_1.default(dialog.text, dialog.name, messageWidth, uri, align);
        this._messages.push(cell);
        this._dialogContainer.addChild(cell);
        this._dialogIndex++;
        this.resize(window.innerWidth, window.innerHeight);
        clearTimeout(this._timeout);
        if (this._dialogIndex >= this._dialogs.length)
            return;
        this._timeout = setTimeout(() => this.showNextMessage(), 1000);
    }
    resize(width, height) {
        const messageSpacing = 150;
        const messageHeight = 150;
        const messageWidth = 240;
        const padding = width > (messageWidth + 80) ? 40 : 0;
        this._messages.forEach((cell, index) => {
            cell.x = (cell.cellPosition === "left") ? padding : width - messageWidth - padding;
            cell.y = messageHeight + index * messageSpacing;
            cell.x = cell.x < padding ? padding : cell.x;
        });
        if (this._dialogContainer.children.length < 1)
            return;
        const index = this._dialogContainer.children.length - 1;
        const last = this._dialogContainer.getChildAt(index);
        const diff = (last.y + messageHeight) - height;
        if (diff > 0) {
            gsap_1.default.killTweensOf(this._dialogContainer);
            gsap_1.default.to(this._dialogContainer, { y: -diff - messageSpacing });
        }
    }
}
exports.default = DialogScreen;
