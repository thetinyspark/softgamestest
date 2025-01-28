import { Facade } from "@thetinyspark/coffe-maker";
import AppConst from "../../../../lib/core/ioc/app.const";
import * as mock from "../../../mock.spec";
import { setup } from "../../../setup.spec";
import IFactory from "../../../../lib/core/service/factory/IFactory";

describe('BuildingFactory test suite', 
()=>{
    it('should be able to create a character from data', 
    ()=>{
        // given 
        const facade = setup() as Facade;
        const factory = facade.getService(AppConst.CHARACTER_FACTORY) as IFactory;

        // when 
        const character = factory.fromData(mock.CHARACTERS_MOCK[0]);

        // then 
        expect(character).not.toBeNull();
    }); 
})