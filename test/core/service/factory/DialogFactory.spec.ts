import { Facade } from "@thetinyspark/coffe-maker";
import AppConst from "../../../../lib/core/ioc/app.const";
import * as mock from "../../../mock.spec";
import { setup } from "../../../setup.spec";
import IFactory from "../../../../lib/core/service/factory/IFactory";
import Dialog from "../../../../lib/core/model/schema/character/Dialog";

describe('DialogFactory test suite', 
()=>{
    it('should be able to create a dialog from data', 
    ()=>{
        // given 
        const facade = setup() as Facade;
        const factory = facade.getService(AppConst.DIALOG_FACTORY) as IFactory;


        // when 
        const data = mock.DIALOGS_MOCK[0];
        const character = factory.fromData(data) as Dialog;

        // then 
        expect(character).not.toBeNull();
        expect(character.id).toBeGreaterThanOrEqual(0);
        expect(character.name).toEqual(data.name);
        expect(character.text).toEqual(data.text);
    }); 

    it('should be able to create a bunch of dialogs from data', 
    ()=>{
        // given 
        const facade = setup() as Facade;
        const factory = facade.getService(AppConst.DIALOG_FACTORY) as IFactory;


        // when 
        // then 
        const data = mock.DIALOGS_MOCK;
        data.forEach( 
            (current)=>{
                const character = factory.fromData(current) as Dialog;
                expect(character).not.toBeNull();
                expect(character.id).toBeGreaterThanOrEqual(0);
                expect(character.name).toEqual(current.name);
                expect(character.text).toEqual(current.text);
            }
        )

    }); 
})