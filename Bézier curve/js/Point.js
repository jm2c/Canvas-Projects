// Ready to use Object
class Point {
    constructor(x, y, ctrl = false) {
        this.x = x;
        this.y = y;
        this.r = 10;
        this.dragging = false;
        this.ctrl = ctrl;
    }
    draw() {
        let alpha = this.ctrl ? 0.4 : .6;
        ctx.fillStyle = `rgba(200, 200, 200, ${alpha})`;
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
    inCircle(x, y) {
        return Math.sqrt((x-this.x)**2+(y-this.y)**2) <= this.r;
    }
}
