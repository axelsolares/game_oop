import Element from './Element.js';

export default class Brick extends Element{
    constructor(context, canvas, { x, y, h, w } = { x: 200, y: 200, h: 20, w: 75}){
        super(context, canvas);

        this.h = h;
        this.w = w;
        this.x = x;
        this.y = y;
        this.destroyed = false;
    }

    update() {
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