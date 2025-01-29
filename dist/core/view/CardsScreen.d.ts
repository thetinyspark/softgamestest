import { Container } from "pixi.js";
import IRepository from "../model/repository/IRepository";
import PixiTextureData from "../model/schema/texture/PixiTextureData";
export default class CardsScreen {
    private _repository;
    private _container;
    private _cardContainer;
    private _timeout;
    private _cardIndex;
    private _cards;
    private _deckPositions;
    constructor(_repository: IRepository<PixiTextureData>);
    getContainer(): Container;
    destroy(): void;
    addBackground(): void;
    addCardContainer(): void;
    reset(): void;
    moveNextCard(): void;
}
