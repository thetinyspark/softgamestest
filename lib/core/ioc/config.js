"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configIOC = configIOC;
exports.configFacade = configFacade;
const coffe_maker_1 = require("@thetinyspark/coffe-maker");
const app_const_1 = __importDefault(require("./app.const"));
const CharacterRepository_1 = __importDefault(require("../model/repository/CharacterRepository"));
const UIDService_1 = __importDefault(require("../service/UIDService"));
const StartApplicationCommand_1 = __importDefault(require("../command/StartApplicationCommand"));
function configIOC(container) {
    container.reset();
    container.register(app_const_1.default.GAME_STORE_MODEL, () => new coffe_maker_1.StoreModel(), true);
    container.register(app_const_1.default.APP_FACADE, () => new coffe_maker_1.Facade(), true);
    container.register(app_const_1.default.START_APP, () => new StartApplicationCommand_1.default());
    container.register(app_const_1.default.CHARACTER_REPOSITORY, () => new CharacterRepository_1.default(container.resolve(app_const_1.default.GAME_STORE_MODEL), "characters"), true);
    container.register(app_const_1.default.UID_SERVICE, () => new UIDService_1.default(), true);
    return container;
}
function configFacade(container) {
    const facade = container.resolve(app_const_1.default.APP_FACADE);
    // commands & queries
    facade.registerCommand(app_const_1.default.START_APP, container.get(app_const_1.default.START_APP));
    // proxies & models
    facade.registerProxy(app_const_1.default.CHARACTER_REPOSITORY, container.resolve(app_const_1.default.CHARACTER_REPOSITORY));
    // services
    facade.registerService(app_const_1.default.UID_SERVICE, container.resolve(app_const_1.default.UID_SERVICE));
    return facade;
}
