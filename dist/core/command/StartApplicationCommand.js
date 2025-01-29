"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_const_1 = require("../ioc/app.const");
/**
 * Starts the application
 *
 * example.ts
 * ```typescript
 *
 * ```
 */
class StartApplicationCommand {
    execute(notification) {
        return __awaiter(this, void 0, void 0, function* () {
            const facade = notification.getEmitter();
            const data = notification.getPayload();
            // load characters data and dialogs
            yield facade.query(app_const_1.default.LOAD_CHARACTERS_AND_DIALOGS);
            // load textures
            yield facade.query(app_const_1.default.LOAD_TEXTURES);
            // init mainmediator
            const mediator = facade.getMediator(app_const_1.default.MAIN_MEDIATOR);
            mediator.init();
            return true;
        });
    }
}
exports.default = StartApplicationCommand;
