import IRepository from "../model/repository/IRepository";
import Character from "../model/schema/character/Character";
import Dialog from "../model/schema/character/Dialog";
export default class CharacterAndDialogService {
    private _characterRepository;
    private _dialogRepository;
    constructor(_characterRepository: IRepository<Character>, _dialogRepository: IRepository<Dialog>);
    getCharacterByDialog(dialog: Dialog): Character;
    getDialogsByCharacter(character: Character): Dialog[];
    getAllDialogs(): Dialog[];
    getAllCharacters(): Character[];
}
