import { Facade } from "@thetinyspark/coffe-maker";
import AppConst from "../../../../lib/core/ioc/app.const";
import * as mock from "../../../mock.spec";
import { setup } from "../../../setup.spec";
import IFactory from "../../../../lib/core/service/factory/IFactory";
import PixiTextureData from "../../../../lib/core/model/schema/texture/PixiTextureData";

describe('TextureFactory test suite', 
()=>{
    it('should be able to create a textureData from data', 
    ()=>{
        // given 
        const facade = setup() as Facade;
        const factory = facade.getService(AppConst.TEXTURE_FACTORY) as IFactory;


        // when 
        const data = mock.CONFIG_MOCKS.textures[0];
        const tex = factory.fromData(data) as PixiTextureData;

        // then 
        expect(tex).not.toBeNull();
        expect(tex.id).toBeGreaterThanOrEqual(0);
        expect(tex.key).toEqual(data.key);
        expect(tex.uri).toEqual(data.url);
    }); 

    it('should be able to create a bunch of textureDatas from data', 
    ()=>{
        // given 
        const facade = setup() as Facade;
        const factory = facade.getService(AppConst.TEXTURE_FACTORY) as IFactory;


        // when 
        // then 
        const data = mock.CONFIG_MOCKS.textures;
        data.forEach( 
            (current)=>{
                const tex = factory.fromData(current) as PixiTextureData;
                expect(tex).not.toBeNull();
                expect(tex.id).toBeGreaterThanOrEqual(0);
                expect(tex.key).toEqual(current.key);
                expect(tex.uri).toEqual(current.url);
            }
        )

    }); 
})