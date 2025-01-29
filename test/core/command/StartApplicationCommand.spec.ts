import { Facade } from "@thetinyspark/coffe-maker";
import AppConst from "../../../lib/core/ioc/app.const";
import { setup } from "../../setup.spec";
import { mockFetch, MAGIC_WORDS_MOCKS } from "../../mock.spec";

describe('StartApplicationCommand test suite', 
()=>{
    it('should be able to start the application', 
    async ()=>{
        // given 
        mockFetch();
        const facade = setup() as Facade;

        // // when 
        const result = await facade.query(AppConst.START_APP, {});

        // then 
        expect(result).toBeTrue();
    });
})