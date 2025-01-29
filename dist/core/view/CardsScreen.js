"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pixi_js_1 = require("pixi.js");
const Card_1 = require("./components/Card");
const Deck_1 = require("./components/Deck");
class CardsScreen {
    constructor(_repository) {
        this._repository = _repository;
        this._cardIndex = 0;
        this._cards = [];
        this._decks = [];
        this._container = new pixi_js_1.Container();
        this._cardContainer = new Deck_1.default(0.0);
    }
    getContainer() {
        return this._container;
    }
    destroy() {
        clearInterval(this._timeout);
        this._decks.forEach((deck) => deck.destroy());
        this._container.removeChildren();
    }
    addBackground() {
        // add board
        const tex = pixi_js_1.Texture.from(this._repository.getOneBy("key", "board").uri);
        const board = new pixi_js_1.Sprite(tex);
        this._container.addChild(board);
    }
    addCardContainer() {
        this._cardContainer = new Deck_1.default(0.0);
        this._cardContainer.x = 60;
        this._cardContainer.y = 150;
        this._container.addChild(this._cardContainer);
    }
    reset() {
        this.destroy();
        this.addBackground();
        this.addCardContainer();
        const cardWidth = 60;
        const cardHeight = 100;
        const texts = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
        this._cards = [];
        this._decks = [];
        for (let i = 0; i < 6; i++) {
            const deck = new Deck_1.default();
            this._decks.push(deck);
            this._container.addChild(deck);
        }
        for (let i = 0; i < 144; i++) {
            const value = texts[i % texts.length];
            const current = new Card_1.default(value, 24, 0xff0000, 0x00ff00, cardWidth, cardHeight);
            current.pivot.set(cardWidth >> 1, cardHeight >> 1);
            this._cardContainer.addCard(current);
            this._cards.push(current);
        }
        this._cardIndex = 0;
        this._timeout = setInterval(() => this.moveNextCard(), 1000);
        this.resize(window.innerWidth, window.innerHeight);
    }
    moveNextCard() {
        if (this._cardContainer.children.length == 0)
            return;
        const currentCard = this._cardContainer.getTopCard();
        const deck = this._decks[this._cardIndex % this._decks.length];
        deck.addCard(currentCard);
        this._cardIndex++;
    }
    resize(width, height) {
        let currentX = this._cardContainer.x + 80;
        let currentY = this._cardContainer.y;
        const cardWidth = 60;
        const cardHeight = 100;
        for (let i = 0; i < this._decks.length; i++) {
            const deck = this._decks[i];
            if (currentX > width - cardWidth) {
                currentX = this._cardContainer.x + 80;
                currentY += cardHeight * 1.5;
            }
            deck.x = currentX;
            deck.y = currentY;
            currentX += cardWidth + 10;
        }
    }
}
exports.default = CardsScreen;
