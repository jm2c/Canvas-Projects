export default class Cloud {
    constructor (x, y, size, vel) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.vel = vel;
        this.r1 = Math.random() + 1,
        this.r2 = Math.random() + 1,
        this.r3 = Math.random() + 1;
    }
    draw (ctx) {
        ctx.fillStyle = 'white';
        ctx.filter = `blur(${this.size * 0.08}px)`;
        // Cloud Base
        ctx.beginPath();
        ctx.arc(this.x - 3*this.size, this.y, this.size, 0, 2 * Math.PI);
        ctx.arc(this.x + 3*this.size, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillRect(
            this.x - 3 * this.size,
            this.y - this.size,
            6 * this.size,
            2 * this.size
        );
        // Cloud upper shape
        ctx.beginPath()
        ctx.arc(this.x - 2*this.size, this.y - this.size, this.r1*this.size, 0, 2 * Math.PI);
        ctx.arc(this.x, this.y-this.size, this.r2*this.size, 0, 2 * Math.PI);
        ctx.arc(this.x + 2*this.size, this.y - this.size, this.r3*this.size, 0, 2 * Math.PI);
        ctx.fill();
    }
    update (ctx) {
        this.x += this.vel;
        this.draw(ctx);
    }
}