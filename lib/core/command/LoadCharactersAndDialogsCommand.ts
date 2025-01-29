import { Facade, ICommand } from "@thetinyspark/coffe-maker";
import { INotification } from "@thetinyspark/tiny-observer";
import AppConst from "../ioc/app.const";
import IRepository from "../model/repository/IRepository";
import Character from "../model/schema/character/Character";
import IFactory from "../service/factory/IFactory";
import { CharacterDesType } from "../model/types/CharacterDescType";
import { DialogDescType } from "../model/types/DialogDescType";
import Dialog from "../model/schema/character/Dialog";

/**
 * Starts the application
 * 
 * example.ts
 * ```typescript
 * 
 * ```
 */
export default class LoadCharactersAndDialogsCommand implements ICommand{
    async execute(notification: INotification): Promise<boolean> {
        const facade:Facade = notification.getEmitter() as Facade;
        const data:any = notification.getPayload() as any; 

        const repository = facade.getProxy(AppConst.CHARACTER_REPOSITORY) as IRepository<Character>;
        const repository2 = facade.getProxy(AppConst.DIALOG_REPOSITORY) as IRepository<Dialog>;
        const factory = facade.getService(AppConst.CHARACTER_FACTORY) as IFactory;
        const factory2 = facade.getService(AppConst.DIALOG_FACTORY) as IFactory;
        repository.reset();
        repository2.reset();

        const url = "https://private-624120-softgamesassignment.apiary-mock.com/magicwords";
        const response = await window.fetch(url); 
        const remoteData = await response.json() as any;
        const charactersData = remoteData.characters as  CharacterDesType[];
        const dialogsData = remoteData.dialogue as  DialogDescType[];

        charactersData.forEach( 
            (current)=>{
                repository.add( factory.fromData(current) );
            }
        );

        dialogsData.forEach( 
            (current)=>{
                repository2.add( factory2.fromData(current) );
            }
        );

        return true;
    }

}