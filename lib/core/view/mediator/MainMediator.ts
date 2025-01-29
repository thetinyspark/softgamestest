import { Facade, Mediator } from "@thetinyspark/coffe-maker";
import { INotification } from "@thetinyspark/tiny-observer";
import AppConst from "../../ioc/app.const";
import IRepository from "../../model/repository/IRepository";
import PixiTextureData from "../../model/schema/texture/PixiTextureData";
import { Application } from "pixi.js";
import CardsScreen from "../CardsScreen";
import DialogScreen from "../DialogScreen";
import CharacterAndDialogService from "../../service/CharacterAndDialogService";
import FireScreen from "../FireScreen";
import VerticalMenu from "../components/VerticalMenu";
import FPSMeter from "../components/FPSMeter";

export default class MainMediator extends Mediator{
    private _menu:VerticalMenu;
    private _cardsScreen:CardsScreen;
    private _dialogScreen:DialogScreen;
    private _fireScreen:FireScreen;
    private _application:Application;

    constructor(){
        super();
    }

    public init(){
        const repo = this.getFacade().getProxy(AppConst.TEXTURE_REPOSITORY) as IRepository<PixiTextureData>;
        const dialogService = this.getFacade().getService(AppConst.CHARACTER_AND_DIALOG) as CharacterAndDialogService;

        CharacterAndDialogService
        this._application = new Application({
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0x1099bb,
        });
        document.body.appendChild(this._application.view as any);


        // init menu
        this._menu = new VerticalMenu();
        this._menu.x = window.innerWidth - this._menu.getWidth();
        this._application.stage.addChild(this._menu);

        this._menu.on(AppConst.GO_TO_FIRE_SCREEN, ()=>{
            this._clearScreens();
            this._fireScreen.reset();
            this._application.stage.addChildAt(this._fireScreen.getContainer(),0); 
            this._onResize();
        });

        this._menu.on(AppConst.GO_TO_DIALOG_SCREEN, ()=>{
            this._clearScreens();
            this._dialogScreen.reset();
            this._application.stage.addChildAt(this._dialogScreen.getContainer(),0); 
            this._onResize();
        });

        this._menu.on(AppConst.GO_TO_CARDS_SCREEN, ()=>{
            this._clearScreens();
            this._cardsScreen.reset();
            this._application.stage.addChildAt(this._cardsScreen.getContainer(),0); 
            this._onResize();
        });

        // init screens
        this._cardsScreen = new CardsScreen(repo);
        this._dialogScreen = new DialogScreen(dialogService,repo);
        this._fireScreen = new FireScreen(repo, this._application);
    
        // init resize listener
        window.addEventListener("resize", ()=>this._onResize());

        // display fps
        this.displayFPS();
    }

    private displayFPS(){
        this._application.stage.addChild(new FPSMeter(this._application));
    }

    private _clearScreens(){
        this._application.stage.removeChild(this._cardsScreen.getContainer());
        this._application.stage.removeChild(this._dialogScreen.getContainer());
        this._application.stage.removeChild(this._fireScreen.getContainer());
        this._fireScreen.destroy();
        this._dialogScreen.destroy();
        this._cardsScreen.destroy();
    }

    private _onResize(){
        this._application.renderer.resize(window.innerWidth, window.innerHeight);
        
        this._menu.resize(window.innerWidth, window.innerHeight);
        this._fireScreen.resize(window.innerWidth, window.innerHeight);
        this._dialogScreen.resize(window.innerWidth, window.innerHeight);
        this._cardsScreen.resize(window.innerWidth, window.innerHeight);
    }
}

