class Obstacle {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }
    get left() {
        return this.x - this.size / 2;
    }
    get right() {
        return this.x + this.size / 2;
    }
    draw() {
        ctx.fillStyle = 'white';
        ctx.fillRect(
            this.x - this.size / 2,
            this.y - this.size / 2,
            this.size,
            2 * this.size);
    }
    update() {
        this.x -= obstaclesVel;
        this.draw();
    }
}