import { Container, Facade } from "@thetinyspark/coffe-maker";
import AppConst from "./core/ioc/app.const";
import { Application } from "pixi.js";
import { configFacade, configIOC } from "./core/ioc/config";

function start(){

    const defaultContainer = new Container();
    configIOC(defaultContainer);
    const facade = configFacade(defaultContainer) as Facade; 
    facade.sendNotification(AppConst.START_APP);
    // document.body.appendChild(app.view as any);
}

window.addEventListener("load", start);