import Level from './Level.js';
import levels from './levels/index.js';

export default class LevelHandler {
    constructor() {
        this.configurations = [];
        this.currentLevel = {};
        this.gameOver = false;
        this.win = false;
        this.score = 0;

        this.loadFiles().setCurrentLevel(this.configurations[0]);
    }

    loadFiles() {
        let files = levels;

        this.configurations = files.sort((a, b) => a.level - b.level);

        return this;
    }

    setCurrentLevel(configuration) {
        this.currentLevel = new Level();

        this.currentLevel.setConfiguration(configuration).load();
    }

    getCurrentLevel() {
        return this.currentLevel;
    }

    update() {
        this.currentLevel.update();

        if (this.currentLevel.isGameOver()) {
            this.gameOver = true;
            return;
        }

        if (!this.currentLevel.isDone()) {
            return;
        }

        if (this.configurations.length <= 1) {
            this.win = true;
            return;
        }

        this.configurations.shift();
        this.setCurrentLevel(this.configurations[0]);
    }

    draw() {
        this.currentLevel?.draw();
    }

    getGameStatus() {
        return { gameOver: this.gameOver, win: this.win };
    }
}