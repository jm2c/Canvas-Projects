export default class Player {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.velY = 0;
        this.score = 0;
    }
    get jumpForce() {
        return this.size / 5;
    }
    get bottom() {
        return this.y + this.size / 2;
    }
    get right() {
        return this.x + this.size / 2;
    }
    get left() {
        return this.x - this.size / 2;
    }
    get bottom() {
        return this.y + this.size / 2;
    }
    draw(ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(
            this.x - this.size / 2,
            this.y - this.size / 2,
            this.size,
            this.size
        );
    }
    update(ctx) {
        this.y += this.velY;

        if (this.bottom > innerHeight) {
            this.velY = 0;
            this.y = innerHeight - this.size / 2;
        }
        this.draw(ctx);
    }
}