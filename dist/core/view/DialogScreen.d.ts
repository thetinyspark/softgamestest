import { Container } from "pixi.js";
import IRepository from "../model/repository/IRepository";
import PixiTextureData from "../model/schema/texture/PixiTextureData";
import CharacterAndDialogService from "../service/CharacterAndDialogService";
export default class DialogScreen {
    private _service;
    private _repository;
    private _container;
    private _dialogContainer;
    private _dialogs;
    private _dialogIndex;
    private _timeout;
    constructor(_service: CharacterAndDialogService, _repository: IRepository<PixiTextureData>);
    getContainer(): Container;
    reset(): void;
    addBackground(): void;
    addDialogContainer(): void;
    destroy(): void;
    showNextMessage(): void;
}
