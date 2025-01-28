import { Container, Facade, StoreModel } from "@thetinyspark/coffe-maker";
import AppConst from "./app.const";
import CharacterRepository from "../model/repository/CharacterRepository";
import UIDService from "../service/UIDService";
import StartApplicationCommand from "../command/StartApplicationCommand";


export function configIOC(container:Container){
    container.reset();
    container.register(AppConst.GAME_STORE_MODEL                , ()=>  new StoreModel()                , true  )
    container.register(AppConst.APP_FACADE                      , ()=>  new Facade()                    , true  );
    container.register(AppConst.START_APP                       , ()=>  new StartApplicationCommand()           );
    container.register(AppConst.CHARACTER_REPOSITORY            , ()=>  new CharacterRepository(container.resolve(AppConst.GAME_STORE_MODEL), "characters"),true);
    container.register( AppConst.UID_SERVICE                    , ()=>  new UIDService(), true);
    return container;
}

export function configFacade(container:Container){
    const facade = container.resolve(AppConst.APP_FACADE);

    // commands & queries
    facade.registerCommand( AppConst.START_APP, container.get(AppConst.START_APP));

    // proxies & models
    facade.registerProxy( AppConst.CHARACTER_REPOSITORY, container.resolve(AppConst.CHARACTER_REPOSITORY));

    // services
    facade.registerService( AppConst.UID_SERVICE, container.resolve(AppConst.UID_SERVICE));
    return facade;
}
