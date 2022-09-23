import Element from './Element.js';
import Paddle from './Paddle.js';
import Brick from './Brick.js';
import ColisionElementPaddle from './ColisionHandler/ColisionElementPaddle.js';
import ColisionElementBrick from './ColisionHandler/ColisionElementBrick.js';

export default class Game {
    constructor(canvas) {
        this.miliseconds = 10;
        this.interval = null;
        this.counter = 0;
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.bricks = [
            new Brick(this.ctx, canvas, {x: 150, y: 50, h: 20, w: 75}),
            new Brick(this.ctx, canvas, {x: 50, y: 50, h: 20, w: 75}),
            new Brick(this.ctx, canvas, {x: 250, y: 50, h: 20, w: 75})
        ];
        this.balls = [
            new Element(this.ctx, canvas),
            new Element(this.ctx, canvas, { x: 100, y: 300, r: 10 })
        ];
        this.paddle = new Paddle(this.ctx, canvas);
        this.elements = [...this.bricks, ...this.balls, this.paddle];
    }

    start() {
        this.interval = setInterval(() => { this.draw(); }, this.miliseconds);
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;
    }

    pause(){
        if(this.interval){
            this.stop();
            console.log("PADDLE: ", this.paddle, this.paddle.getColisionMesh());

            for(let index in this.elements){
                let ball = this.elements[index];
                console.log("Elements "+index+ ": ", ball, ball.getColisionMesh());
            }
            return this;
        }

        this.start();
        return this;
    }

    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        return this;
    }

    update() {
        this.elements.forEach((element) => {
            element.update();
        });

        this.colisions();
        this.gameOver();
    }

    colisions() {
        this.balls.forEach((ball) => {
            ColisionElementPaddle.handleColision(this.paddle, ball);
            this.bricks.forEach((brick) => {
                ColisionElementBrick.handleColision(brick, ball);
            });
        });
    }

    gameOver() {
        for(let ball of this.balls){
            let mesh = ball.getColisionMesh();

            if(mesh.y2 > this.canvas.height){
                alert("GAME OVER");
                this.refresh();
            }
        }

        this.bricks = this.bricks.filter(brick => !brick.destroyed);
        this.elements = this.elements.filter(element => !element.destroyed);

        if(this.bricks.length === 0){
            alert("YOU WIN");
            this.refresh();
        }
    }

    refresh(){
        this.stop();
        document.location.reload();
    }

    draw() {
        this.clear().update();
        this.elements.forEach((element) => {
            element.draw();
        });
    }
}