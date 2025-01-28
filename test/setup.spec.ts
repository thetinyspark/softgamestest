import { Container, Facade } from "@thetinyspark/coffe-maker";
import { configFacade, configIOC } from "../lib/core/ioc/config";

export function setup(container = new Container()){
    configIOC(container);
    const facade = configFacade(container) as Facade; 
    return facade;
}