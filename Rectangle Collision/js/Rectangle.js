export default class Rectangle {
    constructor (x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
    }

    get right()  { return this.x + this.w / 2; }
    get left()   { return this.x - this.w / 2; }
    get bottom() { return this.y + this.h / 2; }
    get top()    { return this.y - this.h / 2; }

    draw (ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(
            this.x - this.w / 2,
            this.y - this.h / 2,
            this.w,
            this.h
        );
    }

    update (ctx) {
        this.draw(ctx);
    }

    colide (rect) {
        return !(this.top > rect.bottom ||
                 this.bottom < rect.top ||
                 this.right < rect.left ||
                 this.left > rect.right )
    }
}