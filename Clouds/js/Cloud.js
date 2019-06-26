export default class Cloud {
    constructor (x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }
    draw (ctx) {
        ctx.fillStyle = 'white';
        ctx.filter = `blur(${this.size * 0.08}px)`;
        ctx.beginPath();
        ctx.arc(this.x - 3*this.size, this.y, this.size, 0, 2 * Math.PI);
        ctx.arc(this.x + 3*this.size, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath()
        ctx.arc(this.x - 2*this.size, this.y-this.size, this.size, 0, 2 * Math.PI);
        ctx.arc(this.x, this.y-this.size, 1.4*this.size, 0, 2 * Math.PI);
        ctx.arc(this.x + 2*this.size, this.y-this.size, 1.5*this.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillRect(
            this.x - 3 * this.size,
            this.y - this.size,
            6 * this.size,
            2 * this.size
        );
    }
    update (ctx) {
        this.draw(ctx);
    }
}