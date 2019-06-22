// Create the canvas and context
const canvas = document.createElement('canvas');
const ctx    = canvas.getContext('2d');
document.body.appendChild(canvas);

// Setup for fullscreen canvas
canvas.style.backgroundColor = 'transparent';
let middleY;
(function init(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    middleY = innerHeight / 2;
    addEventListener('resize', init);
})();

class Wave {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.amp = 0;
    }
    eq(x) {
        return this.amp * Math.sin(x / this.b - this.c);
    }
    draw() {
        ctx.strokeStyle = 'steelblue';
        ctx.beginPath();
        ctx.moveTo(-1, middleY);
        for (let i = 0; i < innerWidth; i++) {
            ctx.lineTo(i, middleY + this.eq(i));
        }
        ctx.stroke();
    }
    update() {
        this.amp = this.a * Math.sin(this.c);
        this.c += 0.01;
        this.draw();
    }
}

const waves = [];
for (let i = 0; i < 30; i++) {
    waves.push(
        new Wave(100, 200, i*(1/60))
    );
}

// Main loop for animations
(function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    // Things to update
    waves.forEach( w => w.update() );
})();