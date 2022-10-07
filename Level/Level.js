import builder from './levelBuilder.js';
import Paddle from '../Paddle.js';
import { canvas, context } from '../canvas.js';
import ColisionElementPaddle from '../ColisionHandler/colisionElementPaddle.js';
import ColisionElementBrick from '../ColisionHandler/colisionElementBrick.js';

export default class Level {
    constructor(construction = {}) {
        this.construction = construction;
        this.bricks = [];
        this.balls = [];
        this.paddle = new Paddle(context, canvas);
        this.elements = [...this.bricks, ...this.balls, this.paddle];
        this.done = false;
        this.gameOver = false;
    }

    setConfiguration(construction) {
        this.construction = construction;
        return this;
    }

    isDone() {
        return this.done;
    }

    isGameOver() {
        return this.gameOver;
    }

    load() {
        let { bricks, balls } = builder.build(this.construction);

        this.bricks = bricks;
        this.balls = balls;

        this.elements = [...this.bricks, ...this.balls, this.paddle];
        this.name = this.construction.name;

        return this;
    }

    colisions() {
        this.balls.forEach((ball) => {
            ColisionElementPaddle.handleColision(this.paddle, ball);
            this.bricks.forEach((brick) => {
                ColisionElementBrick.handleColision(brick, ball);
            });
        });

        return this;
    }

    checkDone() {
        for (let ball of this.balls) {
            let mesh = ball.getColisionMesh();

            if (mesh.y2 > canvas.height) {
                this.gameOver = true;
            }
        }

        this.bricks = this.bricks.filter(brick => !brick.destroyed);
        this.elements = this.elements.filter(element => !element.destroyed);

        if (this.bricks.length === 0) {
            this.done = true;
        }

        return this;
    }

    update() {
        this.elements.forEach((element) => {
            element.update();
        });

        this.colisions().checkDone();
    }

    draw() {
        this.elements.forEach((element) => {
            element.draw();
        });
    }
}