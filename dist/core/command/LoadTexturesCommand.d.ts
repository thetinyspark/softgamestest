import { ICommand } from "@thetinyspark/coffe-maker";
import { INotification } from "@thetinyspark/tiny-observer";
/**
 * Starts the application
 *
 * example.ts
 * ```typescript
 *
 * ```
 */
export default class LoadTexturesCommand implements ICommand {
    execute(notification: INotification): Promise<boolean>;
}
