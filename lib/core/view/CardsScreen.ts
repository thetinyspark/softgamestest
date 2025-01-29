import { Container, Sprite, Texture } from "pixi.js";
import IRepository from "../model/repository/IRepository";
import PixiTextureData from "../model/schema/texture/PixiTextureData";
import Card from "./components/Card";
import gsap from "gsap";
import Deck from "./components/Deck";

export default class CardsScreen {
  private _container: Container;
  private _cardContainer: Deck;
  private _timeout: any;
  private _cardIndex:number = 0;
  private _cards:Card[] = [];
  private _decks:Deck[] = [];

  constructor(private _repository: IRepository<PixiTextureData>) {
    this._container = new Container();
    this._cardContainer = new Deck(0.0);
  }

  getContainer(): Container {
    return this._container;
  }

  destroy() {
    clearInterval(this._timeout);
    this._decks.forEach( 
      (deck)=>deck.destroy()
    )
    this._container.removeChildren();
  }

  addBackground(){
    // add board
    const tex = Texture.from(this._repository.getOneBy("key","board").uri);
    const board = new Sprite(tex);
    this._container.addChild(board);
  }

  addCardContainer(){
    this._cardContainer = new Deck(0.0);
    this._cardContainer.x = 60;
    this._cardContainer.y = 150;
    this._container.addChild(this._cardContainer);
  }

  reset(){
    this.destroy();
    this.addBackground();
    this.addCardContainer();

    const cardWidth = 60;
    const cardHeight = 100;
    const texts = ["1","2","3","4","5","6","7","8","9","10","J","Q","K","A"];

    this._cards = [];
    this._decks = [];

    for( let i = 0; i < 6; i++){
        const deck = new Deck();
        this._decks.push(deck);
        this._container.addChild(deck);
    }


    for( let i = 0; i < 144; i++){
        const value = texts[i%texts.length];
        const current = new Card(value, 24, 0xff0000, 0x00ff00, cardWidth, cardHeight);
        current.pivot.set(cardWidth>>1,cardHeight>>1);
        this._cardContainer.addCard(current);
        this._cards.push(current);
    }

    this._cardIndex = 0;
    this._timeout = setInterval(()=>this.moveNextCard(), 1000);
    this.resize(window.innerWidth, window.innerHeight);
  }

  moveNextCard(){
    if( this._cardContainer.children.length == 0)
        return;

    const currentCard = this._cardContainer.getTopCard();
    const deck = this._decks[this._cardIndex%this._decks.length];
    deck.addCard(currentCard);
    this._cardIndex++;
  }

  resize(width:number, height:number){
    let currentX = this._cardContainer.x + 80;
    let currentY = this._cardContainer.y;

    const cardWidth = 60;
    const cardHeight = 100;

    for( let i = 0; i < this._decks.length; i++){
        const deck = this._decks[i];

        if( currentX > width - cardWidth ){
            currentX = this._cardContainer.x + 80;
            currentY += cardHeight * 1.5;
        }

        deck.x = currentX;
        deck.y = currentY;
        currentX += cardWidth + 10;
    }
  }
}
