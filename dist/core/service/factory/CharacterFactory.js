"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Character_1 = require("../../model/schema/character/Character");
class CharacterFactory {
    constructor(_uidService) {
        this._uidService = _uidService;
        this.fromData = this.fromData.bind(this);
    }
    fromData(obj) {
        return new Character_1.default(this._uidService.createUID("characters"), obj.name, obj.position, obj.avatar);
    }
}
exports.default = CharacterFactory;
