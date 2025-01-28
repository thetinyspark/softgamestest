"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Character {
    constructor(id = -1, name = "", position = "left", avatar = "") {
        this.id = id;
        this.name = name;
        this.position = position;
        this.avatar = avatar;
    }
}
exports.default = Character;
