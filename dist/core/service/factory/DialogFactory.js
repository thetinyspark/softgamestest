"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Dialog_1 = require("../../model/schema/character/Dialog");
class DialogFactory {
    constructor(_uidService) {
        this._uidService = _uidService;
        this.fromData = this.fromData.bind(this);
    }
    fromData(obj) {
        return new Dialog_1.default(this._uidService.createUID("dialogs"), obj.name, obj.text);
    }
}
exports.default = DialogFactory;
