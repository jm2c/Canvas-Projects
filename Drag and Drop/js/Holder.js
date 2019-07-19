import Circle from './Circle.js';

export default class Holder extends Circle {
    constructor(x, y, r) {
        super(x, y, r);
        this.r *= 1.05;
        this.setFilled();
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = ctx.canvas.height * 0.01;
        ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        ctx.stroke();
        ctx.closePath();
    }
    setHollow() { this.color = 'crimson' }
    setHover() { this.color = 'yellow' }
    setFilled() { this.color = 'green' }
}
