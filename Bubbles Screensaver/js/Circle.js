export default class Circle {
    constructor(x, y, r, color, stroke = 1) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
        this.strokeWidth = stroke;
        this.fill = true;
        this.stroke = false;
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.strokeWidth;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        if (this.fill)
            ctx.fill();
        if (this.stroke)
            ctx.stroke();
    }
    collides (circ) {
        return distance(this.x, this.y, circ.x, circ.y) < (this.r + circ.r);
    }
    update(ctx) {
        this.draw(ctx);
    }
}

function distance(x1, y1, x2, y2){
    return Math.sqrt( (x2 - x1)**2 + (y2 - y1)**2 );
}