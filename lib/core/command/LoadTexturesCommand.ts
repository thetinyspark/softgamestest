import { Facade, ICommand } from "@thetinyspark/coffe-maker";
import { INotification } from "@thetinyspark/tiny-observer";
import AppConst from "../ioc/app.const";
import IRepository from "../model/repository/IRepository";
import IFactory from "../service/factory/IFactory";
import { PixiTextureDataDescType } from "../model/types/PixiTextureDataDescType";
import PixiTextureData from "../model/schema/texture/PixiTextureData";

/**
 * Starts the application
 * 
 * example.ts
 * ```typescript
 * 
 * ```
 */
export default class LoadTexturesCommand implements ICommand{
    async execute(notification: INotification): Promise<boolean> {
        const facade:Facade = notification.getEmitter() as Facade;
        const data:any = notification.getPayload() as any; 

        const repository = facade.getProxy(AppConst.TEXTURE_REPOSITORY) as IRepository<PixiTextureData>;
        const factory = facade.getService(AppConst.TEXTURE_FACTORY) as IFactory;

        const url = "./config.json";
        const response = await window.fetch(url); 
        const remoteData = await response.json() as any;

        remoteData.textures.forEach( 
            (current:PixiTextureDataDescType)=>{
                repository.add( factory.fromData(current));
            }
        );

        return true;
    }

}