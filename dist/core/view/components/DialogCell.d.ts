import { Container } from "pixi.js";
export default class DialogCell extends Container {
    cellPosition: string;
    constructor(text: string, author: string, width: number, avatarUri?: string, align?: string);
}
