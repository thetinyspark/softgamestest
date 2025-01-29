import { Facade } from "@thetinyspark/coffe-maker";
import AppConst from "../../../lib/core/ioc/app.const";
import { setup } from "../../setup.spec";
import { mockFetch, CONFIG_MOCKS } from "../../mock.spec";
import IRepository from "../../../lib/core/model/repository/IRepository";
import PixiTextureData from "../../../lib/core/model/schema/texture/PixiTextureData";

describe('LoadTexturesCommand test suite', 
()=>{
    it('should have filled the TexturesRepository', 
    async ()=>{
        // given 
        mockFetch();
        
        const facade = setup() as Facade;
        const repository = facade.getProxy(AppConst.TEXTURE_REPOSITORY) as IRepository<PixiTextureData>;
        
        // when 
        repository.reset();
        await facade.query(AppConst.LOAD_TEXTURES, {});
        const textures = await repository.getAll();

        // then 
        expect(textures.length).toEqual(CONFIG_MOCKS.textures.length);
    });

})