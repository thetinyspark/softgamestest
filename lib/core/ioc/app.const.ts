export default class AppConst{
    // facade
    static APP_FACADE:string                    = "AppFacade";

    // model
    static GAME_STORE_MODEL:string              = "GameStoreModel"

    // commands
    static START_APP:string                     = "StartApp";
    static LOAD_CHARACTERS_AND_DIALOGS:string   = "LoadCharactersAndDialogs";
    static LOAD_TEXTURES:string                 = "LoadTextures";

    // queries
    static GET_CITY_QUERY:string                = "GetCityQuery";

    // repositories
    static CHARACTER_REPOSITORY:string          = "CharacterRepository";
    static DIALOG_REPOSITORY:string             = "DialogRepository";
    static TEXTURE_REPOSITORY:string            = "TextureRepository";

    // factories
    static CHARACTER_FACTORY:string             = "CharacterFactory";
    static DIALOG_FACTORY:string                = "DialogFactory";
    static TEXTURE_FACTORY:string               = "TextureFactory";
    
    // services
    static UID_SERVICE:string                   = "UIDService";
    static CHARACTER_AND_DIALOG:string          = "CharacterAndDialogService";

    // mediator
    static MAIN_MEDIATOR:string                 = "MainMediator";
    
    // switch screen
    static GO_TO_FIRE_SCREEN:string             = "GoToFireScreen";
    static GO_TO_CARDS_SCREEN:string            = "GoToCardsScreen";
    static GO_TO_DIALOG_SCREEN:string           = "GoToDialogsScreen";
    
}