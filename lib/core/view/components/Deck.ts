import { Container } from "pixi.js";
import Card from "./Card";
import gsap from "gsap";

export default class Deck extends Container{
    constructor(public durationTime:number = 2.0){
        super();

    }
    destroy(){
        this.children.forEach( 
            (current)=>{
                gsap.killTweensOf(current);
            }
        );

        this.removeChildren();
    }

    getTopCard():Card{
        return this.getChildAt(this.children.length-1) as Card;
    }

    addCard(card:Card){
        this.addChild(card);

        gsap.fromTo(
            card,
            {
                rotation:0,
                x: card.x - this.x,
                y: card.y - this.y,
            },
            {
                rotation:Math.PI * 4,
                x: 0,
                y: (this.children.length * 4),
                duration: this.durationTime, 
            }
        ); 
    }
}