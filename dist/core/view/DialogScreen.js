"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pixi_js_1 = require("pixi.js");
class DialogScreen {
    constructor(_service, _repository) {
        this._service = _service;
        this._repository = _repository;
        this._dialogs = [];
        this._dialogIndex = 0;
        this._container = new pixi_js_1.Container();
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
        clearTimeout(this._timeout);
        this.showNextMessage();
        this._container.addChild(this._dialogContainer);
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
        clearInterval(this._timeout);
        this._container.removeChildren();
    }
    showNextMessage() {
        if (this._dialogIndex > this._dialogs.length - 1)
            return;
        const messageWidth = 350;
        const messageHeight = 50;
        const dialog = this._dialogs[this._dialogIndex];
        const messageSpacing = 150;
        const message = new pixi_js_1.Text(dialog.text, {
            fontFamily: "Arial",
            fontSize: 24,
            fill: 0x000000,
            wordWrap: true,
            align: "left",
            wordWrapWidth: messageWidth,
        });
        // Créer un fond blanc pour chaque message
        const background = new pixi_js_1.Graphics();
        background.beginFill(0xffffff); // Couleur de fond blanc
        background.drawRect(0, 0, messageWidth + 20, message.height + 20); // Ajouter un peu de padding autour du texte
        background.endFill();
        const character = this._service.getCharacterByDialog(dialog);
        if ((character === null || character === void 0 ? void 0 : character.position) === "left") {
            message.x = 40;
            background.x = message.x - 10;
            message.anchor.set(0, 0);
            message.style.align = "left";
        }
        else {
            message.x = window.innerWidth - messageWidth - 40;
            background.x = message.x - 10;
            message.anchor.set(0, 0);
            message.style.align = "right";
        }
        message.y = messageHeight + this._dialogIndex * messageSpacing;
        background.y = message.y - 10;
        this._dialogContainer.addChild(background);
        this._dialogContainer.addChild(message);
        if (character) {
            const personTexture = pixi_js_1.Texture.from(character.avatar);
            const personSprite = new pixi_js_1.Sprite(personTexture);
            personSprite.x = message.x;
            personSprite.y = message.y;
            personSprite.scale.set(0.5, 0.5);
            personSprite.anchor.set(0, 1);
            this._dialogContainer.addChild(personSprite);
        }
        const diff = message.y - window.innerHeight;
        if (diff > 0)
            this._dialogContainer.y = -diff - messageSpacing;
        this._dialogIndex++;
        clearTimeout(this._timeout);
        if (this._dialogIndex >= this._dialogs.length)
            return;
        this._timeout = setTimeout(() => this.showNextMessage(), 1000);
    }
}
exports.default = DialogScreen;
