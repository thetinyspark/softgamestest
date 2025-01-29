import Dialog from "../../model/schema/character/Dialog";
import PixiTextureData from "../../model/schema/texture/PixiTextureData";
import IUIDService from "../IUIDService";
import IFactory from "./IFactory";

export default class TextureFactory implements IFactory{
    constructor(private _uidService:IUIDService){
        this.fromData = this.fromData.bind(this);
    }

    fromData(obj:any):PixiTextureData{
        return new PixiTextureData(this._uidService.createUID("textures"), obj.key, obj.url);
    }
}