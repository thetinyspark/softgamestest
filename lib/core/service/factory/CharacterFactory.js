"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Character_1 = __importDefault(require("../../model/schema/character/Character"));
class CharacterFactory {
    constructor(_uidService) {
        this._uidService = _uidService;
        this.fromData = this.fromData.bind(this);
    }
    fromData(obj) {
        return new Character_1.default();
    }
}
exports.default = CharacterFactory;
