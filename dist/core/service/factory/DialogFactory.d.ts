import Dialog from "../../model/schema/character/Dialog";
import IUIDService from "../IUIDService";
import IFactory from "./IFactory";
export default class DialogFactory implements IFactory {
    private _uidService;
    constructor(_uidService: IUIDService);
    fromData(obj: any): Dialog;
}
