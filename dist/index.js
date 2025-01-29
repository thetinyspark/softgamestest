"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coffe_maker_1 = require("@thetinyspark/coffe-maker");
const app_const_1 = require("./core/ioc/app.const");
const config_1 = require("./core/ioc/config");
function start() {
    const defaultContainer = new coffe_maker_1.Container();
    (0, config_1.configIOC)(defaultContainer);
    const facade = (0, config_1.configFacade)(defaultContainer);
    facade.sendNotification(app_const_1.default.START_APP);
    // document.body.appendChild(app.view as any);
}
window.addEventListener("load", start);
