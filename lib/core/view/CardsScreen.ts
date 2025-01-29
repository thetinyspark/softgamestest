import { Container, Sprite, Texture } from "pixi.js";
import IRepository from "../model/repository/IRepository";
import PixiTextureData from "../model/schema/texture/PixiTextureData";
import Card from "./components/Card";
import gsap from "gsap";

export default class CardsScreen {
  private _container: Container;
  private _cardContainer: Container;
  private _timeout: any;
  private _cardIndex:number = 0;
  private _cards:Card[] = [];
  private _deckPositions:any[] = [];

  constructor(private _repository: IRepository<PixiTextureData>) {
    this._container = new Container();
  }

  getContainer(): Container {
    return this._container;
  }

  destroy() {
    clearInterval(this._timeout);
    this._cards.forEach( 
        (current)=>{
            gsap.killTweensOf(current);
        }
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
    this._cardContainer = new Container();
    this._container.addChild(this._cardContainer);
  }

  reset(){
    this.destroy();
    this.addBackground();
    this.addCardContainer();

    const cardWidth = 60;
    const cardHeight = 100;
    const texts = ["1","2","3","4","5","6","7","8","9","10","J","Q","K","A"];
    const posX = 120;
    const posY = window.innerHeight - 100;

    this._cards = [];
    this._deckPositions = [];

    let currentX = 60;
    let currentY = 60;
    for( let i = 0; i < 12; i++){
        if( currentX > window.innerWidth - cardWidth ){
            currentX = 60;
            currentY += cardHeight * 1.5;
        }

        this._deckPositions.push({x:currentX,y:currentY, num:0});
        currentX += cardWidth + 10;
    }


    for( let i = 0; i < 144; i++){
        // create main deck (stat)
        const value = texts[i%texts.length];
        const current = new Card(value, 24, 0xff0000, 0x00ff00, cardWidth, cardHeight);
        current.pivot.set(cardWidth>>1,cardHeight>>1);
        current.x = posX;
        current.y = posY - (i*2);
        this._cardContainer.addChild(current);
        this._cards.push(current);
    }

    this._cardIndex = this._cards.length-1;
    this._timeout = setInterval(()=>this.moveNextCard(), 1000);
  }

  moveNextCard(){
    if( this._cardIndex < 0)
        return;

    const currentCard = this._cards[this._cardIndex];
    const nextIndex = this._cards.length - this._cardIndex;
    const deck = this._deckPositions[nextIndex%this._deckPositions.length];
    deck.num++;

    gsap.fromTo(
        currentCard,
        {
            rotation:0,
            x: currentCard.x,
            y: currentCard.y,
        },
        {
            rotation:Math.PI * 4,
            x: deck.x,
            y: deck.y + (deck.num * 4),
            duration: 2, 
            onUpdate: function(){
             if( this.progress() > 0.5 && currentCard.updated === false ){
                currentCard.updateDepth();
             }
            }
        }
    ); 
    this._cardIndex--;
  }
}
