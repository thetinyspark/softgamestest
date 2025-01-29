import { Container, Graphics, Text } from "pixi.js";
import AppConst from "../../ioc/app.const";

export default class VerticalMenu extends Container {
  private _options: string[] = [];
  private _menuItems: { buttonText: Text; buttonBackground: Graphics }[] = [];

  constructor() {
    super();

    this._options = ["Ace of Shadows", "Magic Words", "Phoenix Flame"];
    this._menuItems = [];

    this._createMenuItem = this._createMenuItem.bind(this);
    this._clickHandler = this._clickHandler.bind(this);
    this.getWidth = this.getWidth.bind(this);
    this.createMenu();
  }

  createMenu() {
    const menuWidth = 200;
    const fontSize = 24;
    const padding = 15;

    this._options.forEach((option, index) => {
      this._createMenuItem(option, index, menuWidth, fontSize, padding);
    });
  }

  getWidth(){ return 200;}

  _createMenuItem(
    option: string,
    index: number,
    menuWidth: number,
    fontSize: number,
    padding: number
  ) {
    const buttonText = new Text(option, {
      fontFamily: "Arial",
      fontSize: fontSize,
      fill: 0xffffff,
      align: "center",
    });

    buttonText.x = (menuWidth - buttonText.width) / 2;
    buttonText.y = index * (fontSize + padding);

    const buttonBackground = new Graphics();
    buttonBackground.beginFill(0x333333);
    buttonBackground.drawRect(0, 0, menuWidth, buttonText.height + 20);
    buttonBackground.endFill();

    buttonBackground.x = 0;
    buttonBackground.y = buttonText.y - 10;
    buttonBackground.interactive = true;

    buttonBackground.on("pointerover", () => {
      buttonBackground.beginFill(0x555555);
      buttonBackground.drawRect(0, 0, menuWidth, buttonText.height + 20);
      buttonBackground.endFill();
    });

    buttonBackground.on("pointerout", () => {
      buttonBackground.beginFill(0x333333);
      buttonBackground.drawRect(0, 0, menuWidth, buttonText.height + 20);
      buttonBackground.endFill();
    });

    buttonBackground.on("pointerdown", () => {
      this._clickHandler(index);
    });

    this.addChild(buttonBackground);
    this.addChild(buttonText);

    this._menuItems.push({ buttonText, buttonBackground });
  }

  _clickHandler(index: number) {
    if( index === 0)
        this.emit(AppConst.GO_TO_CARDS_SCREEN);
    else if( index === 1)
        this.emit(AppConst.GO_TO_DIALOG_SCREEN);
    else
        this.emit(AppConst.GO_TO_FIRE_SCREEN);
  }

  resize(width:number, height:number){
    this.x = width - this.getWidth();
    this.y = 10;
  }
}
