import Character from "../../model/schema/character/Character";
import IUIDService from "../IUIDService";
import IFactory from "./IFactory";
export default class CharacterFactory implements IFactory {
    private _uidService;
    constructor(_uidService: IUIDService);
    fromData(obj: any): Character;
}
