import { Filter } from "pixi.js";
export default class FlameFilter extends Filter {
    time: number;
    constructor(texture: any, time?: number);
    get texture(): any;
    set texture(texture: any);
    apply(filterManager: any, input: any, output: any, clear: any): void;
}
