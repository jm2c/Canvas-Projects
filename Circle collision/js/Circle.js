export default class Circle {
    constructor(x, y, r, color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
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