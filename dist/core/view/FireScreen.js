"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pixi_js_1 = require("pixi.js");
class FireScreen {
    constructor(_repository) {
        this._repository = _repository;
        this._flames = [];
        this._container = new pixi_js_1.Container();
        console.log(this._repository);
    }
    update() {
        // Animer les flammes pour créer l'effet de feu
        this._flames.forEach(flame => {
            // Mouvement des flammes
            flame.y -= Math.random() * 0.5; // Flamme monte lentement
            flame.x += Math.random() * 0.3 - 0.15; // Déplacement horizontal aléatoire
            // Rotation aléatoire pour un effet réaliste
            flame.rotation += Math.random() * 0.02 - 0.01;
            // Modification de l'opacité pour simuler le scintillement du feu
            flame.alpha = Math.random() * 0.5 + 0.5; // Opacité change légèrement à chaque frame
            // Réinitialiser la flamme lorsqu'elle dépasse un certain point pour la rendre "infinie"
            if (flame.y < -100) {
                flame.y = Math.random() * 50 + 100; // Réinitialise la position de la flamme
                flame.x = Math.random() * 200 - 100; // Position aléatoire
            }
        });
    }
    getContainer() {
        return this._container;
    }
    destroy() {
        clearInterval(this._timeout);
    }
    reset() {
        this._container.removeChildren();
        console.log(this._repository);
        // Créer une texture de flamme (à remplacer par une texture réelle)
        const flameTexture = pixi_js_1.Texture.from(this._repository.getOneBy("key", "fire").uri); // Texture de flamme, doit être ajoutée dans ton projet
        // Créer 10 sprites représentant des flammes
        for (let i = 0; i < 10; i++) {
            const flame = new pixi_js_1.Sprite(flameTexture);
            this._flames.push(flame);
            this._container.addChild(flame);
            // Positionner les flammes de façon aléatoire pour un effet plus naturel
            flame.x = Math.random() * 200 - 100 + 200; // Placer dans un rayon autour du centre
            flame.y = 300 - Math.random() * 50;
            flame.alpha = Math.random() * 0.5 + 0.5; // Alpha aléatoire pour la transparence
            flame.rotation = Math.random() * Math.PI; // Rotation aléatoire de départ
        }
        // Mettre à jour les flammes à chaque frame
        this.update = this.update.bind(this);
        this._timeout = setInterval(() => {
            this.update();
        }, 15);
    }
}
exports.default = FireScreen;
