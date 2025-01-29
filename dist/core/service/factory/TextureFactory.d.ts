import PixiTextureData from "../../model/schema/texture/PixiTextureData";
import IUIDService from "../IUIDService";
import IFactory from "./IFactory";
export default class TextureFactory implements IFactory {
    private _uidService;
    constructor(_uidService: IUIDService);
    fromData(obj: any): PixiTextureData;
}
