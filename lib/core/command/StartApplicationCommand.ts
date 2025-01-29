import { Facade, ICommand } from "@thetinyspark/coffe-maker";
import { INotification } from "@thetinyspark/tiny-observer";
import AppConst from "../ioc/app.const";
import MainMediator from "../view/mediator/MainMediator";

/**
 * Starts the application
 * 
 * example.ts
 * ```typescript
 * 
 * ```
 */
export default class StartApplicationCommand implements ICommand{
    async execute(notification: INotification): Promise<boolean> {
        const facade:Facade = notification.getEmitter() as Facade;
        const data:any = notification.getPayload() as any; 

        // load characters data and dialogs
        await facade.query(AppConst.LOAD_CHARACTERS_AND_DIALOGS);
        
        // load textures
        await facade.query(AppConst.LOAD_TEXTURES);

        // init mainmediator
        const mediator = facade.getMediator(AppConst.MAIN_MEDIATOR) as MainMediator;
        mediator.init();
        return true;
    }
}