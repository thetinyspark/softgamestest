"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configIOC = configIOC;
exports.configFacade = configFacade;
const coffe_maker_1 = require("@thetinyspark/coffe-maker");
const app_const_1 = require("./app.const");
const CharacterRepository_1 = require("../model/repository/CharacterRepository");
const UIDService_1 = require("../service/UIDService");
const StartApplicationCommand_1 = require("../command/StartApplicationCommand");
const CharacterFactory_1 = require("../service/factory/CharacterFactory");
const DialogRepository_1 = require("../model/repository/DialogRepository");
const DialogFactory_1 = require("../service/factory/DialogFactory");
const LoadCharactersAndDialogsCommand_1 = require("../command/LoadCharactersAndDialogsCommand");
const LoadTexturesCommand_1 = require("../command/LoadTexturesCommand");
const TextureRepository_1 = require("../model/repository/TextureRepository");
const TextureFactory_1 = require("../service/factory/TextureFactory");
const CharacterAndDialogService_1 = require("../service/CharacterAndDialogService");
const MainMediator_1 = require("../view/mediator/MainMediator");
function configIOC(container) {
    container.reset();
    container.register(app_const_1.default.MAIN_MEDIATOR, () => new MainMediator_1.default(), true);
    container.register(app_const_1.default.GAME_STORE_MODEL, () => new coffe_maker_1.StoreModel(), true);
    container.register(app_const_1.default.APP_FACADE, () => new coffe_maker_1.Facade(), true);
    container.register(app_const_1.default.START_APP, () => new StartApplicationCommand_1.default());
    container.register(app_const_1.default.LOAD_CHARACTERS_AND_DIALOGS, () => new LoadCharactersAndDialogsCommand_1.default());
    container.register(app_const_1.default.LOAD_TEXTURES, () => new LoadTexturesCommand_1.default());
    container.register(app_const_1.default.CHARACTER_REPOSITORY, () => new CharacterRepository_1.default(container.resolve(app_const_1.default.GAME_STORE_MODEL), "characters"), true);
    container.register(app_const_1.default.TEXTURE_REPOSITORY, () => new TextureRepository_1.default(container.resolve(app_const_1.default.GAME_STORE_MODEL), "textures"), true);
    container.register(app_const_1.default.DIALOG_REPOSITORY, () => new DialogRepository_1.default(container.resolve(app_const_1.default.GAME_STORE_MODEL), "dialogs"), true);
    container.register(app_const_1.default.CHARACTER_FACTORY, () => new CharacterFactory_1.default(container.resolve(app_const_1.default.UID_SERVICE)), true);
    container.register(app_const_1.default.TEXTURE_FACTORY, () => new TextureFactory_1.default(container.resolve(app_const_1.default.UID_SERVICE)), true);
    container.register(app_const_1.default.DIALOG_FACTORY, () => new DialogFactory_1.default(container.resolve(app_const_1.default.UID_SERVICE)), true);
    container.register(app_const_1.default.UID_SERVICE, () => new UIDService_1.default(), true);
    container.register(app_const_1.default.CHARACTER_AND_DIALOG, () => new CharacterAndDialogService_1.default(container.resolve(app_const_1.default.CHARACTER_REPOSITORY), container.resolve(app_const_1.default.DIALOG_REPOSITORY)), true);
    return container;
}
function configFacade(container) {
    const facade = container.resolve(app_const_1.default.APP_FACADE);
    // commands & queries
    facade.registerCommand(app_const_1.default.START_APP, container.get(app_const_1.default.START_APP));
    facade.registerCommand(app_const_1.default.LOAD_CHARACTERS_AND_DIALOGS, container.get(app_const_1.default.LOAD_CHARACTERS_AND_DIALOGS));
    facade.registerCommand(app_const_1.default.LOAD_TEXTURES, container.get(app_const_1.default.LOAD_TEXTURES));
    // proxies & models
    facade.registerProxy(app_const_1.default.CHARACTER_REPOSITORY, container.resolve(app_const_1.default.CHARACTER_REPOSITORY));
    facade.registerProxy(app_const_1.default.DIALOG_REPOSITORY, container.resolve(app_const_1.default.DIALOG_REPOSITORY));
    facade.registerProxy(app_const_1.default.TEXTURE_REPOSITORY, container.resolve(app_const_1.default.TEXTURE_REPOSITORY));
    // services
    facade.registerService(app_const_1.default.UID_SERVICE, container.resolve(app_const_1.default.UID_SERVICE));
    facade.registerService(app_const_1.default.CHARACTER_AND_DIALOG, container.resolve(app_const_1.default.CHARACTER_AND_DIALOG));
    facade.registerService(app_const_1.default.CHARACTER_FACTORY, container.resolve(app_const_1.default.CHARACTER_FACTORY));
    facade.registerService(app_const_1.default.DIALOG_FACTORY, container.resolve(app_const_1.default.DIALOG_FACTORY));
    facade.registerService(app_const_1.default.TEXTURE_FACTORY, container.resolve(app_const_1.default.TEXTURE_FACTORY));
    //mediators
    facade.registerMediator(app_const_1.default.MAIN_MEDIATOR, container.resolve(app_const_1.default.MAIN_MEDIATOR));
    return facade;
}
