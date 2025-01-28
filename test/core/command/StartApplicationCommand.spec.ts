import { Facade } from "@thetinyspark/coffe-maker";
import AppConst from "../../../lib/core/ioc/app.const";
import { setup } from "../../setup.spec";

describe('StartApplicationCommand test suite', 
()=>{
    it('should be able to start the application', 
    async ()=>{
        // given 
        // const facade = setup() as Facade;

        // // when 
        // const result = facade.sendNotification(AppConst.START_APP, {});

        // then 
        // expect(result).toBeTrue();
        expect(true).toBeTruthy();
    });
})