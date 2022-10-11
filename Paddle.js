import Element from './Element.js';

export default class Paddle extends Element {
    constructor(context, canvas, { x, y, h, w } = { x: 200, y: 200, h: 10, w: 75 }) {
        super(context, canvas);

        this.h = h;
        this.w = w;
        this.x = (canvas.width - w) / 2;
        this.y = canvas.height - this.h;
        this.leftPressed = false;
        this.rightPressed = false;
        this.dx = 7;

        this.behaviors();
    }

    behaviors() {
        document.addEventListener("keydown", (e) => { this.keyDownHandler(e) }, false);
        document.addEventListener("keyup", (e) => { this.keyUpHandler(e) }, false);
    }

    keyDownHandler(e) {
        if (e.key === "Right" || e.key === "ArrowRight") {
            this.rightPressed = true;
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
            this.leftPressed = true;
        }
    }

    keyUpHandler(e) {
        if (e.key === "Right" || e.key === "ArrowRight") {
            this.rightPressed = false;
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
            this.leftPressed = false;
        }
    }

    update() {
        if (this.rightPressed) {
            this.x = Math.min(this.x + this.dx, this.canvas.width - this.w);
        } else if (this.leftPressed) {
            this.x = Math.max(this.x - this.dx, 0);
        }
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.w, this.h);
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fill();
        this.ctx.closePath();
    }

    getColisionMesh() {
        return {
            x1: this.x,
            x2: this.x + this.w,
            y1: this.y - this.h,
            y2: this.y
        }
    }
}