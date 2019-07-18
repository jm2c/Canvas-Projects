// Create the canvas and context
const canvas = document.createElement('canvas');
const ctx    = canvas.getContext('2d');
document.body.appendChild(canvas);

let width, height, frame = 0;
canvas.style.backgroundColor = 'black';
width = canvas.width = 600;
height = canvas.height = 600;
ctx.translate(width / 2, height / 2);

// Particle
class Particle {
    constructor (x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }
    draw () {
        ctx.fillStyle = 'lime';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
    }
    update (t) {
        const n = .992;
        const a = (height / 2)*(.4/n);
        this.y = -a * (n*cos(t)-cos(n*t));
        this.x = a * (n*sin(t)-sin(n*t));
        this.draw();
    }
}
const particles = [];
for (let i = 0; i < 1; i++) {
    particles.push(
        new Particle(width / 2, height / 2, 3)
    );
}

// Main loop for animations
(function animate(){
    frame = requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0,0,0,0.02)';
    ctx.fillRect(-width/2, -height/2, width, height);
    ctx.fill();
    // Things to update
    particles.forEach( particle => {
        particle.update(frame/1);
    })
})();

function sin(x) { return Math.sin(x); }
function cos(x) { return Math.cos(x); }