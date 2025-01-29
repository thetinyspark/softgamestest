import { Container } from "pixi.js";
export default class VerticalMenu extends Container {
    private _options;
    private _menuItems;
    constructor();
    createMenu(): void;
    getWidth(): number;
    _createMenuItem(option: string, index: number, menuWidth: number, fontSize: number, padding: number): void;
    _clickHandler(index: number): void;
}
