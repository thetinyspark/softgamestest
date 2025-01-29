"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pixi_js_1 = require("pixi.js");
const FlameFilter_1 = require("./FlameFilter");
class FireScreen {
    constructor(_repository, _app) {
        this._repository = _repository;
        this._app = _app;
        this._container = new pixi_js_1.Container();
        this._flameContainer = new pixi_js_1.Container();
        const texURI = this._repository.getOneBy("key", "noise").uri;
        const texture = pixi_js_1.Texture.from(texURI);
        this._chemneyTexture = pixi_js_1.Texture.from(this._repository.getOneBy("key", "chemney").uri);
        this._texture = texture;
    }
    getContainer() {
        return this._container;
    }
    destroy() {
        this._container.removeChildren();
        clearInterval(this._timeout);
    }
    reset() {
        this._container.removeChildren();
        // add background
        const tex = this._chemneyTexture;
        const chemney = new pixi_js_1.Sprite(tex);
        chemney.x = (window.innerWidth - tex.baseTexture.width) / 2;
        // board.scale.set(3,3);
        this._container.addChild(chemney);
        this._container.addChild(this._flameContainer);
        if (window.devicePixelRatio > 1) {
            pixi_js_1.settings.RESOLUTION = 2;
        }
        const area = this._app.screen.clone();
        area.y = window.innerHeight / 2;
        area.height = window.innerHeight / 2;
        this._flame = new FlameFilter_1.default(this._texture);
        this._flameContainer.filterArea = area;
        this._flameContainer.filters = [this._flame];
        this._timeout = setInterval(() => {
            this.update(16);
        }, 16);
    }
    update(delta) {
        this._flame.time += 0.1 * delta;
    }
    resize(width, height) {
    }
}
exports.default = FireScreen;
