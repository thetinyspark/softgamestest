"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CharacterAndDialogService {
    constructor(_characterRepository, _dialogRepository) {
        this._characterRepository = _characterRepository;
        this._dialogRepository = _dialogRepository;
    }
    getCharacterByDialog(dialog) {
        return this.getAllCharacters().filter(char => char.name === dialog.name)[0];
    }
    getDialogsByCharacter(character) {
        return this.getAllDialogs().filter(dialog => character.name === dialog.name);
    }
    getAllDialogs() {
        return this._dialogRepository.getAll();
    }
    getAllCharacters() {
        return this._characterRepository.getAll();
    }
}
exports.default = CharacterAndDialogService;
