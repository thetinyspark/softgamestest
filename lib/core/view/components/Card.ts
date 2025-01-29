import { Container, Text, Graphics } from "pixi.js";


export default class Card extends Container {
  private _text: Text;
  private _background: Graphics;
  private _border: Graphics;

  constructor(
        text:string="", 
        fontSize:number = 12, 
        textColor:number = 0x000000,
        backgroundColor:number = 0xFFFFFF,
        width:number = 100, 
        height:number = 60,
    ) 
    {
    super();

    this._background = new Graphics();
    
    this._text = new Text(text, {
        fontFamily: "Arial",
        fontSize: fontSize,
        fill: textColor,
        align: "center",
    });
    
    this._text.x = (width - this._text.width) / 2;
    this._text.y = (height - this._text.height) / 2;
    
    this.setText(text);
    this.setBackgroundColor(backgroundColor);
    this.setSize(width,height);

    this.addChild(this._border);
    this.addChild(this._background);
    this.addChild(this._text);
  }

  setText(newText: string): void {
    this._text.text = newText;
    this._text.x = (this._background.width - this._text.width) / 2;
    this._text.y = (this._background.height - this._text.height) / 2;
  }

  setBackgroundColor(newColor: number): void {
    this._background.clear();
    this._background.beginFill(newColor);
    this._background.drawRect(1, 1, this._background.width - 2, this._background.height - 2);
    this._background.endFill();
  }

  setSize(newWidth: number, newHeight: number): void {
    this._background.clear();
    this._background.beginFill(this._background.tint);
    this._background.drawRect(1, 1, newWidth-2, newHeight-2);
    this._background.endFill();

    this._border = new Graphics();
    this._border.clear();
    this._border.beginFill(0x000000);
    this._border.drawRect(0, 0, newWidth, newHeight);
    this._border.endFill();

    this._text.x = (newWidth - this._text.width) / 2;
    this._text.y = (newHeight - this._text.height) / 2;
  }

}
