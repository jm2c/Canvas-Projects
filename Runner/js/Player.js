class Player {
    constructor(x, y, size){
        this.x = x;
        this.y = y;
        this.size = size;
        this.velY = 0;
        this.jumpForce = 8;
    }
    get bottom(){
        return this.y + this.size / 2;
    }
    draw(){
        ctx.fillStyle = 'white';
        ctx.fillRect(
            this.x - this.size / 2,
            this.y - this.size / 2,
            this.size,
            this.size
        );
    }
    update(){
        this.velY += gravity;
        this.y += this.velY;

        if (this.bottom > innerHeight) {
            this.velY = 0;
            this.y = innerHeight - this.size / 2;
        }
        this.draw();
    }
}