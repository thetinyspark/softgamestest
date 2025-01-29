import { Container } from "pixi.js";
import Card from "./Card";
export default class Deck extends Container {
    durationTime: number;
    constructor(durationTime?: number);
    destroy(): void;
    getTopCard(): Card;
    addCard(card: Card): void;
}
