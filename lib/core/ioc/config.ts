import { Container, Facade, StoreModel } from "@thetinyspark/coffe-maker";
import AppConst from "./app.const";
import CharacterRepository from "../model/repository/CharacterRepository";
import UIDService from "../service/UIDService";
import StartApplicationCommand from "../command/StartApplicationCommand";
import CharacterFactory from "../service/factory/CharacterFactory";
import DialogRepository from "../model/repository/DialogRepository";
import DialogFactory from "../service/factory/DialogFactory";
import LoadCharactersAndDialogsCommand from "../command/LoadCharactersAndDialogsCommand";
import LoadTexturesCommand from "../command/LoadTexturesCommand";
import TextureRepository from "../model/repository/TextureRepository";
import TextureFactory from "../service/factory/TextureFactory";
import CharacterAndDialogService from "../service/CharacterAndDialogService";
import MainMediator from "../view/mediator/MainMediator";


export function configIOC(container:Container){
    container.reset();
    container.register(AppConst.MAIN_MEDIATOR                  , ()=>  new MainMediator()              , true           );
    container.register(AppConst.GAME_STORE_MODEL               , ()=>  new StoreModel()                , true           );
    container.register(AppConst.APP_FACADE                     , ()=>  new Facade()                    , true           );
    container.register(AppConst.START_APP                      , ()=>  new StartApplicationCommand()                    );
    container.register(AppConst.LOAD_CHARACTERS_AND_DIALOGS    , ()=>  new LoadCharactersAndDialogsCommand()            );
    container.register(AppConst.LOAD_TEXTURES                  , ()=>  new LoadTexturesCommand()                        );
    container.register(AppConst.CHARACTER_REPOSITORY           , ()=>  new CharacterRepository(container.resolve(AppConst.GAME_STORE_MODEL), "characters"),true);
    container.register(AppConst.TEXTURE_REPOSITORY             , ()=>  new TextureRepository(container.resolve(AppConst.GAME_STORE_MODEL), "textures"),true);
    container.register(AppConst.DIALOG_REPOSITORY              , ()=>  new DialogRepository(container.resolve(AppConst.GAME_STORE_MODEL), "dialogs"),true);
    container.register(AppConst.CHARACTER_FACTORY              , ()=>  new CharacterFactory(container.resolve(AppConst.UID_SERVICE)), true);
    container.register(AppConst.TEXTURE_FACTORY                , ()=>  new TextureFactory(container.resolve(AppConst.UID_SERVICE)), true);
    container.register(AppConst.DIALOG_FACTORY                 , ()=>  new DialogFactory(container.resolve(AppConst.UID_SERVICE)), true);
    container.register(AppConst.UID_SERVICE                    , ()=>  new UIDService(), true);
    container.register(AppConst.CHARACTER_AND_DIALOG, 
        ()=>  new CharacterAndDialogService(
            container.resolve(AppConst.CHARACTER_REPOSITORY),
            container.resolve(AppConst.DIALOG_REPOSITORY),
        )
        , true
    );
    return container;
}

export function configFacade(container:Container){
    const facade = container.resolve(AppConst.APP_FACADE);

    // commands & queries
    facade.registerCommand( AppConst.START_APP, container.get(AppConst.START_APP));
    facade.registerCommand( AppConst.LOAD_CHARACTERS_AND_DIALOGS, container.get(AppConst.LOAD_CHARACTERS_AND_DIALOGS));
    facade.registerCommand( AppConst.LOAD_TEXTURES, container.get(AppConst.LOAD_TEXTURES));

    // proxies & models
    facade.registerProxy( AppConst.CHARACTER_REPOSITORY, container.resolve(AppConst.CHARACTER_REPOSITORY));
    facade.registerProxy( AppConst.DIALOG_REPOSITORY, container.resolve(AppConst.DIALOG_REPOSITORY));
    facade.registerProxy( AppConst.TEXTURE_REPOSITORY, container.resolve(AppConst.TEXTURE_REPOSITORY));

    // services
    facade.registerService( AppConst.UID_SERVICE, container.resolve(AppConst.UID_SERVICE));
    facade.registerService( AppConst.CHARACTER_AND_DIALOG, container.resolve(AppConst.CHARACTER_AND_DIALOG));
    facade.registerService( AppConst.CHARACTER_FACTORY, container.resolve(AppConst.CHARACTER_FACTORY));
    facade.registerService( AppConst.DIALOG_FACTORY, container.resolve(AppConst.DIALOG_FACTORY));
    facade.registerService( AppConst.TEXTURE_FACTORY, container.resolve(AppConst.TEXTURE_FACTORY));

    //mediators
	facade.registerMediator( AppConst.MAIN_MEDIATOR, container.resolve(AppConst.MAIN_MEDIATOR));
    return facade;
}
