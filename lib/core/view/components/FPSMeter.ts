import { Application, Container, Graphics, Text } from "pixi.js";

export default class FPSMeter extends Container {
  constructor(app: Application) {
    super();

    const fpsText = new Text("", {
      fontFamily: "Arial",
      fontSize: 18,
      fill: 0xffffff,
      align: "center",
    });

    const background = new Graphics();
    background.beginFill(0x111111);
    background.drawRect(0, 0, 100, 30);
    background.endFill();

    
    fpsText.position.set(10, 10);
    this.addChild(background);
    this.addChild(fpsText);

    app.ticker.add(() => {
      fpsText.text = `FPS: ${Math.round(app.ticker.FPS)}`;
    });
  }
}
