import { Container } from "pixi.js";
export default class Card extends Container {
    private _text;
    private _background;
    private _border;
    constructor(text?: string, fontSize?: number, textColor?: number, backgroundColor?: number, width?: number, height?: number);
    setText(newText: string): void;
    setBackgroundColor(newColor: number): void;
    setSize(newWidth: number, newHeight: number): void;
}
