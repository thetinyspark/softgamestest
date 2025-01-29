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
class LoadTexturesCommand {
    execute(notification) {
        return __awaiter(this, void 0, void 0, function* () {
            const facade = notification.getEmitter();
            const data = notification.getPayload();
            const repository = facade.getProxy(app_const_1.default.TEXTURE_REPOSITORY);
            const factory = facade.getService(app_const_1.default.TEXTURE_FACTORY);
            const url = "./config.json";
            const response = yield window.fetch(url);
            const remoteData = yield response.json();
            remoteData.textures.forEach((current) => {
                repository.add(factory.fromData(current));
            });
            return true;
        });
    }
}
exports.default = LoadTexturesCommand;
