import gsap from "gsap";
import { Container, Graphics, Sprite, Text, Texture, TilingSprite } from "pixi.js";

export default class DialogCell extends Container{
  public cellPosition:string = "";

  constructor(text: string, author:string, width: number, avatarUri:string ="", align:string ="left") {

    super();

    this.cellPosition= align;
    
    const message = new Text(text, {
      fontFamily: "Arial",
      fontSize: 18,
      fill: 0x000000,
      wordWrap: true,
      align: (align == "left") ? "left" : "right",
      wordWrapWidth: width,
    });

    message.anchor.set(0, 0);
    message.x = 10;
    message.y = 10;

    const background = new Graphics();
    background.beginFill(0xffffff); 
    background.drawRect(0, 0, width + 20, message.height + 20); 
    background.endFill();


    this.addChild(background);
    this.addChild(message);

    if( avatarUri != ""){ 
      const personTexture = Texture.from(avatarUri);
      const personSprite = new Sprite(personTexture);
      personSprite.scale.set(0.5,0.5);
      personSprite.anchor.set(0,1);
      this.addChild(personSprite);
    }
    else{
      const title = new Text(author, {
        fontFamily: "Arial",
        fontSize: 12,
        fill: 0xFF8800,
        wordWrap: true,
        align: "left",
        wordWrapWidth: width,
      });

      const bgTitle = new Graphics();
      bgTitle.beginFill(0xffffff); 
      bgTitle.drawRect(0, 0, title.width + 20, title.height); 
      bgTitle.endFill();
      bgTitle.y -= bgTitle.height;

      title.anchor.set(0,1);
      this.addChild(bgTitle); 
      this.addChild(title); 
      
    }

    gsap.fromTo(this, {alpha: 0}, {duration:0.5, alpha:1});
  }
}
