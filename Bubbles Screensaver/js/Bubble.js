import Circle from "./Circle.js";

export default class Bubble extends Circle {
    constructor(x, y, r, velX, velY, color, stroke = 1) {
        super(x, y, r, color, stroke);
        this.velX = velX;
        this.velY = velY;
        this.fill = true;
        this.stroke = true;
        this.timestamp = Date.now();
    }
}

Bubble.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.strokeWidth;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    if (this.fill){
        ctx.save();
        ctx.globalAlpha = 0.12;
        ctx.fill();
        ctx.restore();
    }
    if (this.stroke)
        ctx.stroke();
}

Bubble.prototype.update = function(ctx) {
    this.x += this.velX;
    this.y += this.velY;
    this.draw(ctx)
}

Bubble.prototype.isNew = function() {
    return this.timestamp + 2E3 > Date.now();
}

function slope (x1, y1, x2, y2) {
    return (y2 - y1) / (x2 - x1);
}