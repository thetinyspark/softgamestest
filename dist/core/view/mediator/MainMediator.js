"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coffe_maker_1 = require("@thetinyspark/coffe-maker");
const app_const_1 = require("../../ioc/app.const");
const pixi_js_1 = require("pixi.js");
const CardsScreen_1 = require("../CardsScreen");
const DialogScreen_1 = require("../DialogScreen");
const CharacterAndDialogService_1 = require("../../service/CharacterAndDialogService");
const FireScreen_1 = require("../FireScreen");
const VerticalMenu_1 = require("../components/VerticalMenu");
class MainMediator extends coffe_maker_1.Mediator {
    constructor() {
        super();
    }
    init() {
        const repo = this.getFacade().getProxy(app_const_1.default.TEXTURE_REPOSITORY);
        const dialogService = this.getFacade().getService(app_const_1.default.CHARACTER_AND_DIALOG);
        CharacterAndDialogService_1.default;
        this._application = new pixi_js_1.Application({
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0x1099bb,
        });
        document.body.appendChild(this._application.view);
        // init menu
        this._menu = new VerticalMenu_1.default();
        this._menu.x = window.innerWidth - this._menu.getWidth();
        this._application.stage.addChild(this._menu);
        this._menu.on(app_const_1.default.GO_TO_FIRE_SCREEN, () => {
            this._clearScreens();
            this._fireScreen.destroy();
            this._fireScreen.reset();
            this._application.stage.addChildAt(this._fireScreen.getContainer(), 0);
        });
        this._menu.on(app_const_1.default.GO_TO_DIALOG_SCREEN, () => {
            this._clearScreens();
            this._dialogScreen.destroy();
            this._dialogScreen.reset();
            this._application.stage.addChildAt(this._dialogScreen.getContainer(), 0);
        });
        this._menu.on(app_const_1.default.GO_TO_CARDS_SCREEN, () => {
            this._clearScreens();
            this._cardsScreen.destroy();
            this._cardsScreen.reset();
            this._application.stage.addChildAt(this._cardsScreen.getContainer(), 0);
        });
        // init screens
        this._cardsScreen = new CardsScreen_1.default(repo);
        this._dialogScreen = new DialogScreen_1.default(dialogService, repo);
        this._fireScreen = new FireScreen_1.default(repo, this._application);
    }
    _clearScreens() {
        this._application.stage.removeChild(this._cardsScreen.getContainer());
        this._application.stage.removeChild(this._dialogScreen.getContainer());
        this._application.stage.removeChild(this._fireScreen.getContainer());
    }
}
exports.default = MainMediator;
