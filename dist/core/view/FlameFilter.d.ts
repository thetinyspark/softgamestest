import { Filter, Texture } from "pixi.js";
export default class FlameFilter extends Filter {
    time: number;
    constructor(texture: Texture, time?: number);
    set texture(texture: Texture);
    apply(filterManager: any, input: any, output: any, clear: any): void;
}
