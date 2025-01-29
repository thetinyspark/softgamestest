import Character from "../../model/schema/character/Character";
import IUIDService from "../IUIDService";
import IFactory from "./IFactory";

export default class CharacterFactory implements IFactory{
    constructor(private _uidService:IUIDService){
        this.fromData = this.fromData.bind(this);
    }

    fromData(obj:any):Character{
        return new Character(this._uidService.createUID("characters"), obj.name, obj.position, obj.avatar);
    }
}