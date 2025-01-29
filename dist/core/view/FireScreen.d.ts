import { Application, Container } from "pixi.js";
import IRepository from "../model/repository/IRepository";
import PixiTextureData from "../model/schema/texture/PixiTextureData";
export default class FireScreen {
    private _repository;
    private _app;
    private _flame;
    private _container;
    private _flameContainer;
    private _timeout;
    private _texture;
    private _chemneyTexture;
    constructor(_repository: IRepository<PixiTextureData>, _app: Application);
    getContainer(): Container;
    destroy(): void;
    reset(): void;
    update(delta: any): void;
    resize(width: number, height: number): void;
}
