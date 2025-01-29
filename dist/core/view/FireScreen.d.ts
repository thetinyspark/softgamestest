import { Container } from "pixi.js";
import IRepository from "../model/repository/IRepository";
import PixiTextureData from "../model/schema/texture/PixiTextureData";
export default class FireScreen {
    private _repository;
    private _flames;
    private _container;
    private _timeout;
    constructor(_repository: IRepository<PixiTextureData>);
    update(): void;
    getContainer(): Container;
    destroy(): void;
    reset(): void;
}
