import { Facade } from "@thetinyspark/coffe-maker";
import AppConst from "../../../lib/core/ioc/app.const";
import { setup } from "../../setup.spec";
import { mockFetch, DIALOGS_MOCK, CHARACTERS_MOCK, MAGIC_WORDS_MOCKS } from "../../mock.spec";
import IRepository from "../../../lib/core/model/repository/IRepository";
import Character from "../../../lib/core/model/schema/character/Character";
import Dialog from "../../../lib/core/model/schema/character/Dialog";

describe('LoadCharacterAndDialogsCommand test suite', 
()=>{


    it('should have filled the CharactersRepository', 
    async ()=>{
        // given 
        mockFetch();
        const facade = setup() as Facade;
        const repository = facade.getProxy(AppConst.CHARACTER_REPOSITORY) as IRepository<Character>;
        
        // // when 
        repository.reset();
        await facade.query(AppConst.LOAD_CHARACTERS_AND_DIALOGS, {});
        const characters = await repository.getAll();

        // then 
        expect(characters.length).toEqual(CHARACTERS_MOCK.length);
    });

    it('should have filled the DialogRepository', 
    async ()=>{
        // given 
        mockFetch();
        const facade = setup() as Facade;
        const repository = facade.getProxy(AppConst.DIALOG_REPOSITORY) as IRepository<Dialog>;
        
        // // when 
        repository.reset();
        await facade.query(AppConst.LOAD_CHARACTERS_AND_DIALOGS, {});
        const dialogs = await repository.getAll();

        // then 
        expect(dialogs.length).toEqual(DIALOGS_MOCK.length);
    });
})