
import { canvas, context } from './canvas.js';
import LevelHandler from './Level/LevelHandler.js';

export default class Game {
    constructor() {
        this.miliseconds = 10;
        this.interval = null;
        this.counter = 0;
        this.canvas = canvas;
        this.ctx = context;
        this.levelHandler = new LevelHandler();
    }

    start() {
        this.interval = setInterval(() => { this.draw(); }, this.miliseconds);
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;
    }

    pause() {
        if (this.interval) {
            this.stop();
            return this;
        }

        this.start();
        return this;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        return this;
    }

    update() {
        this.levelHandler.update();

        let { gameOver, win } = this.levelHandler.getGameStatus();

        if(win) {
            alert("YOU WIN!!!");
            this.refresh();
        }

        if(gameOver) {
            alert("GAME OVER");
            this.refresh();
        }

        return this;
    }

    refresh() {
        this.stop();
        document.location.reload();
    }

    draw() {
        this.clear().update();

        this.levelHandler.draw();
    }
}