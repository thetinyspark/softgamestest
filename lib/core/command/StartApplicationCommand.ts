import { Facade, ICommand } from "@thetinyspark/coffe-maker";
import { INotification } from "@thetinyspark/tiny-observer";

/**
 * Starts the application
 * 
 * example.ts
 * ```typescript
 * 
 * ```
 */
export default class StartApplicationCommand implements ICommand{
    execute(notification: INotification): boolean {
        // const facade:Facade = notification.getEmitter() as Facade;
        // const data:any = notification.getPayload() as any; 
        return true;
    }
}