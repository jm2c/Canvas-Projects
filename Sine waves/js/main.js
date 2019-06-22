// Settings
const config = {
    amplitud: 100,
    frequency: 200,
    velocity: 3,
    numWaves: 50,
    distanceRatio: 1/40,
    color: 'white'
}

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
    constructor(a, b, c, vel, color) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.amp = 0;
        this.vel = vel
        this.color = color;
    }
    eq(x) {
        return this.amp * Math.sin(x / this.b - this.c);
    }
    draw() {
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(-1, middleY);
        for (let i = 0; i < innerWidth; i++) {
            ctx.lineTo(i, middleY + this.eq(i));
        }
        ctx.stroke();
    }
    update() {
        this.amp = this.a * Math.sin(this.c);
        this.c += this.vel / 100;
        this.draw();
    }
}

const waves = [];
for (let i = 0; i < config.numWaves; i++) {
    waves.push(
        new Wave(
            config.amplitud,
            config.frequency,
            i * config.distanceRatio,
            config.velocity,
            config.color
        )
    );
}

// Main loop for animations
(function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    // Things to update
    waves.forEach( w => w.update() );
})();