"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PixiTextureData_1 = require("../../model/schema/texture/PixiTextureData");
class TextureFactory {
    constructor(_uidService) {
        this._uidService = _uidService;
        this.fromData = this.fromData.bind(this);
    }
    fromData(obj) {
        return new PixiTextureData_1.default(this._uidService.createUID("textures"), obj.key, obj.url);
    }
}
exports.default = TextureFactory;
