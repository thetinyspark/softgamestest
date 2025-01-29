import { setup } from "../../setup.spec";
import { Facade } from "@thetinyspark/coffe-maker";
import AppConst from "../../../lib/core/ioc/app.const";
import CharacterAndDialogService from "../../../lib/core/service/CharacterAndDialogService";
import IRepository from "../../../lib/core/model/repository/IRepository";
import Character from "../../../lib/core/model/schema/character/Character";
import Dialog from "../../../lib/core/model/schema/character/Dialog";
import IFactory from "../../../lib/core/service/factory/IFactory";
import { CHARACTERS_MOCK, DIALOGS_MOCK } from "../../mock.spec";

describe("CharacterAndDialogService test suite", () => {
  it("should be able to get all dialogs", () => {
    // given
    const facade = setup() as Facade;
    const service = facade.getService(AppConst.CHARACTER_AND_DIALOG) as CharacterAndDialogService;
    const repo1 = facade.getProxy(AppConst.CHARACTER_REPOSITORY) as IRepository<Character>;
    const repo2 = facade.getProxy(AppConst.DIALOG_REPOSITORY) as IRepository<Dialog>;
    const factory1 = facade.getService(AppConst.CHARACTER_FACTORY) as IFactory;
    const factory2 = facade.getService(AppConst.DIALOG_FACTORY) as IFactory;

    CHARACTERS_MOCK.forEach( (current)=>repo1.add( factory1.fromData(current) ));
    DIALOGS_MOCK.forEach( (current)=>repo2.add( factory2.fromData(current) ));
  
    // when 
    const dialogs:Dialog[] = service.getAllDialogs();

    expect(dialogs.length).toEqual(DIALOGS_MOCK.length);
  });

  it("should be able to get all characters", () => {
    // given
    const facade = setup() as Facade;
    const service = facade.getService(AppConst.CHARACTER_AND_DIALOG) as CharacterAndDialogService;
    const repo1 = facade.getProxy(AppConst.CHARACTER_REPOSITORY) as IRepository<Character>;
    const repo2 = facade.getProxy(AppConst.DIALOG_REPOSITORY) as IRepository<Dialog>;
    const factory1 = facade.getService(AppConst.CHARACTER_FACTORY) as IFactory;
    const factory2 = facade.getService(AppConst.DIALOG_FACTORY) as IFactory;

    CHARACTERS_MOCK.forEach( (current)=>repo1.add( factory1.fromData(current) ));
    DIALOGS_MOCK.forEach( (current)=>repo2.add( factory2.fromData(current) ));
  
    // when 
    const characters:Character[] = service.getAllCharacters();

    expect(characters.length).toEqual(CHARACTERS_MOCK.length);
  });

  it("should be able to get all dialogs for a character", () => {
    // given
    const facade = setup() as Facade;
    const service = facade.getService(AppConst.CHARACTER_AND_DIALOG) as CharacterAndDialogService;
    const repo1 = facade.getProxy(AppConst.CHARACTER_REPOSITORY) as IRepository<Character>;
    const repo2 = facade.getProxy(AppConst.DIALOG_REPOSITORY) as IRepository<Dialog>;
    const factory1 = facade.getService(AppConst.CHARACTER_FACTORY) as IFactory;
    const factory2 = facade.getService(AppConst.DIALOG_FACTORY) as IFactory;

    CHARACTERS_MOCK.forEach( (current)=>repo1.add( factory1.fromData(current) ));
    DIALOGS_MOCK.forEach( (current)=>repo2.add( factory2.fromData(current) ));
  
    // when 
    const characters:Character[] = service.getAllCharacters();
    const dialogs = service.getDialogsByCharacter(characters[0]);

    expect(dialogs.length).toBeGreaterThan(0);
    dialogs.forEach( 
        (current)=> expect(current.name).toEqual(characters[0].name)
    )
  });

  it("should be able to get a character from a dialog", () => {
    // given
    const facade = setup() as Facade;
    const service = facade.getService(AppConst.CHARACTER_AND_DIALOG) as CharacterAndDialogService;
    const repo1 = facade.getProxy(AppConst.CHARACTER_REPOSITORY) as IRepository<Character>;
    const repo2 = facade.getProxy(AppConst.DIALOG_REPOSITORY) as IRepository<Dialog>;
    const factory1 = facade.getService(AppConst.CHARACTER_FACTORY) as IFactory;
    const factory2 = facade.getService(AppConst.DIALOG_FACTORY) as IFactory;

    CHARACTERS_MOCK.forEach( (current)=>repo1.add( factory1.fromData(current) ));
    DIALOGS_MOCK.forEach( (current)=>repo2.add( factory2.fromData(current) ));
  
    // when 
    const dialogs:Dialog[] = service.getAllDialogs();
    const character = service.getCharacterByDialog(dialogs[0]);

    expect(character.name).toEqual(dialogs[0].name);
  });
});
