import { Facade } from "@thetinyspark/coffe-maker";
import AppConst from "../../../../lib/core/ioc/app.const";
import * as mock from "../../../mock.spec";
import { setup } from "../../../setup.spec";
import IFactory from "../../../../lib/core/service/factory/IFactory";
import Character from "../../../../lib/core/model/schema/character/Character";

describe('CharacterFactory test suite', 
()=>{
    it('should be able to create a character from data', 
    ()=>{
        // given 
        const facade = setup() as Facade;
        const factory = facade.getService(AppConst.CHARACTER_FACTORY) as IFactory;


        // when 
        const data = mock.CHARACTERS_MOCK[0];
        const character = factory.fromData(data) as Character;

        // then 
        expect(character).not.toBeNull();
        expect(character.id).toBeGreaterThanOrEqual(0);
        expect(character.avatar).toEqual(data.avatar);
        expect(character.name).toEqual(data.name);
        expect(character.position).toEqual(data.position);
    }); 

    it('should be able to create a bunch of characters from data', 
    ()=>{
        // given 
        const facade = setup() as Facade;
        const factory = facade.getService(AppConst.CHARACTER_FACTORY) as IFactory;


        // when 
        // then 
        const data = mock.CHARACTERS_MOCK;
        data.forEach( 
            (current)=>{
                const character = factory.fromData(current) as Character;
                expect(character).not.toBeNull();
                expect(character.id).toBeGreaterThanOrEqual(0);
                expect(character.avatar).toEqual(current.avatar);
                expect(character.name).toEqual(current.name);
                expect(character.position).toEqual(current.position);
            }
        )

    }); 
})