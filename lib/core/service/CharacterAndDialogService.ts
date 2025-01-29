import IRepository from "../model/repository/IRepository";
import Character from "../model/schema/character/Character";
import Dialog from "../model/schema/character/Dialog";

export default class CharacterAndDialogService{

    constructor( 
        private _characterRepository:IRepository<Character>,
        private _dialogRepository:IRepository<Dialog>,
    ){}


    getCharacterByDialog(dialog:Dialog):Character{
        return this.getAllCharacters().filter( char=>char.name === dialog.name)[0];
    }

    getDialogsByCharacter(character:Character):Dialog[]{
        return this.getAllDialogs().filter( dialog=>character.name === dialog.name);
    }

    getAllDialogs():Dialog[]{
        return this._dialogRepository.getAll();
    }

    getAllCharacters():Character[]{
        return this._characterRepository.getAll();
    }
}