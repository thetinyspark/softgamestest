import { Application, Container, settings, Sprite, Texture } from "pixi.js";
import IRepository from "../model/repository/IRepository";
import PixiTextureData from "../model/schema/texture/PixiTextureData";
import FlameFilter from "./FlameFilter";

export default class FireScreen {
  private _flame: FlameFilter;
  private _container: Container;
  private _flameContainer:Container;
  private _timeout: any;
  private _texture: Texture;
  private _chemneyTexture: Texture;

  constructor(
    private _repository: IRepository<PixiTextureData>,
    private _app: Application
  ) {
    this._container = new Container();
    this._flameContainer = new Container();
    const texURI = this._repository.getOneBy("key", "noise").uri;
    const texture = Texture.from(texURI);
    this._chemneyTexture = Texture.from(this._repository.getOneBy("key", "chemney").uri);
    this._texture = texture;
  }

  getContainer(): Container {
    return this._container;
  }

  destroy() {
    this._container.removeChildren();
    clearInterval(this._timeout);
  }

  reset() {
    this._container.removeChildren();

    // add background
    const tex = this._chemneyTexture;
    const chemney = new Sprite(tex);
    chemney.x = ( window.innerWidth - tex.baseTexture.width )  / 2;

    // board.scale.set(3,3);
    this._container.addChild(chemney);
    this._container.addChild(this._flameContainer);

    if (window.devicePixelRatio > 1) {
      settings.RESOLUTION = 2;
    }

    const area = this._app.screen.clone();
    area.y = window.innerHeight / 2;
    area.height = window.innerHeight / 2;
    this._flame = new FlameFilter(this._texture);
    this._flameContainer.filterArea = area;
    this._flameContainer.filters = [this._flame];

    this._timeout = setInterval(() => {
      this.update(16);
    }, 16);
  }

  update(delta) {
    this._flame.time += 0.1 * delta;
  }

  resize(width:number, height:number){
    
  }
}
