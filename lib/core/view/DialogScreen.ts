import { Container, Graphics, Sprite, Text, Texture } from "pixi.js";
import IRepository from "../model/repository/IRepository";
import PixiTextureData from "../model/schema/texture/PixiTextureData";
import CharacterAndDialogService from "../service/CharacterAndDialogService";
import Dialog from "../model/schema/character/Dialog";

export default class DialogScreen {
  private _container: Container;
  private _dialogContainer: Container;
  private _dialogs: Dialog[] = [];
  private _dialogIndex: number = 0;
  private _timeout: any;

  constructor(
    private _service: CharacterAndDialogService,
    private _repository: IRepository<PixiTextureData>
  ) {
    this._container = new Container();
  }

  getContainer(): Container {
    return this._container;
  }

  reset() {
    this.destroy();
    this.addBackground();
    this.addDialogContainer();

    this._dialogs = this._service.getAllDialogs();
    this._dialogIndex = 0;
    this._dialogContainer.y = 0;
    clearTimeout(this._timeout);
    this.showNextMessage();

    this._container.addChild(this._dialogContainer);
  }
  

  addBackground(){
    // add board
    const tex = Texture.from(this._repository.getOneBy("key","texting").uri);
    const board = new Sprite(tex);
    board.scale.set(3,3);
    this._container.addChild(board);
  }

  addDialogContainer(){
    this._dialogContainer = new Container();
    this._container.addChild(this._dialogContainer);
  }

  destroy() {
    clearInterval(this._timeout);
    this._container.removeChildren();
  }

  showNextMessage() {
    if( this._dialogIndex > this._dialogs.length - 1)
      return;

    const messageWidth = 350;
    const messageHeight = 50;
    const dialog = this._dialogs[this._dialogIndex];
    const messageSpacing = 150;

    const message = new Text(dialog.text, {
      fontFamily: "Arial",
      fontSize: 24,
      fill: 0x000000,
      wordWrap: true,
      align: "left",
      wordWrapWidth: messageWidth,
    });

    // Créer un fond blanc pour chaque message
    const background = new Graphics();
    background.beginFill(0xffffff); // Couleur de fond blanc
    background.drawRect(0, 0, messageWidth + 20, message.height + 20); // Ajouter un peu de padding autour du texte
    background.endFill();

    const character = this._service.getCharacterByDialog(dialog);

    if ( character?.position === "left" ) {
      message.x = 40;
      background.x = message.x - 10;
      message.anchor.set(0, 0);
      message.style.align = "left";
      } 
    else{
      message.x = window.innerWidth - messageWidth - 40;
      background.x = message.x - 10;
      message.anchor.set(0, 0);
      message.style.align = "right";
    }

    message.y = messageHeight + this._dialogIndex * messageSpacing;
    background.y = message.y - 10;
    this._dialogContainer.addChild(background);
    this._dialogContainer.addChild(message);

    if( character){
      const personTexture = Texture.from(character.avatar);
      const personSprite = new Sprite(personTexture);
      personSprite.x = message.x;
      personSprite.y = message.y;
      personSprite.scale.set(0.5,0.5);
      personSprite.anchor.set(0,1);
      this._dialogContainer.addChild(personSprite);
    }


    const diff = message.y - window.innerHeight;
    if( diff > 0)
      this._dialogContainer.y = -diff - messageSpacing;

    this._dialogIndex++;
    clearTimeout(this._timeout);

    if (this._dialogIndex >= this._dialogs.length) return;

    this._timeout = setTimeout(() => this.showNextMessage(), 1000);
  }
}
