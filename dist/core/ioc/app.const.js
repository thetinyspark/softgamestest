"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppConst {
}
// facade
AppConst.APP_FACADE = "AppFacade";
// model
AppConst.GAME_STORE_MODEL = "GameStoreModel";
// commands
AppConst.START_APP = "StartApp";
AppConst.LOAD_CHARACTERS_AND_DIALOGS = "LoadCharactersAndDialogs";
AppConst.LOAD_TEXTURES = "LoadTextures";
// queries
AppConst.GET_CITY_QUERY = "GetCityQuery";
// repositories
AppConst.CHARACTER_REPOSITORY = "CharacterRepository";
AppConst.DIALOG_REPOSITORY = "DialogRepository";
AppConst.TEXTURE_REPOSITORY = "TextureRepository";
// factories
AppConst.CHARACTER_FACTORY = "CharacterFactory";
AppConst.DIALOG_FACTORY = "DialogFactory";
AppConst.TEXTURE_FACTORY = "TextureFactory";
// services
AppConst.UID_SERVICE = "UIDService";
AppConst.CHARACTER_AND_DIALOG = "CharacterAndDialogService";
// mediator
AppConst.MAIN_MEDIATOR = "MainMediator";
// switch screen
AppConst.GO_TO_FIRE_SCREEN = "GoToFireScreen";
AppConst.GO_TO_CARDS_SCREEN = "GoToCardsScreen";
AppConst.GO_TO_DIALOG_SCREEN = "GoToDialogsScreen";
exports.default = AppConst;
