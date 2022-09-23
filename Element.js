export default class Element {
    constructor(context, canvas, { x, y, r } = { x: 200, y: 200, r: 10}){
        this.ctx = context;
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.r = r;
        this.dx = 2;
        this.dy = -2;
    }


    update() {
        if (this.y + this.dy < this.r) {
            this.dy = -this.dy;
        }

        if (this.x + this.dx > this.canvas.width - this.r || this.x + this.dx < this.r) {
            this.dx = -this.dx;
        }

        this.x += this.dx;
        this.y += this.dy;

        return this;
    }

    getColisionMesh() {
        return {
            x1: this.x,
            x2: this.x + ( this.r * 2 ),
            y1: this.y - ( this.r * 2 ),
            y2: this.y
        }
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fill();
        this.ctx.closePath();
        return this;
    }
}