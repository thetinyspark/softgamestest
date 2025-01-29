import Dialog from "../../model/schema/character/Dialog";
import IUIDService from "../IUIDService";
import IFactory from "./IFactory";

export default class DialogFactory implements IFactory{
    constructor(private _uidService:IUIDService){
        this.fromData = this.fromData.bind(this);
    }

    fromData(obj:any):Dialog{
        return new Dialog(this._uidService.createUID("dialogs"), obj.name, obj.text);
    }
}