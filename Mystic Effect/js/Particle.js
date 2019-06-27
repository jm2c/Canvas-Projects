export default class Particle {
    constructor (x, y, size, velX, velY, hue) {
        this.x = x;        
        this.y = y;        
        this.size = size;        
        this.velX = velX;        
        this.velY = velY;        
        this.hue = hue;
        this.alpha = 1;
    }
    draw (ctx) {
        ctx.fillStyle = `hsla(${this.hue}, 100%, 50%, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }
    update (ctx) {
        this.x += this.velX;
        this.y += this.velY;
        this.alpha -= 0.01;
        this.draw(ctx);
    }
}