// Configs for the effect
const config = {
    numParticles: 200,
    minOrbitRadius: 5,
    maxOrbitRadius: 15,
    maxParticleSize: 5,
    leaveTrace: true
}

// Create the canvas
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

// Fit the canvas to the window size and append it in the document
(function init(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    addEventListener('resize', init);
})();
document.body.appendChild(canvas);

// Update constantly mouse coordenates
let mouseX, mouseY;
addEventListener('mousemove', evt => {
    mouseX = evt.x;
    mouseY = evt.y;
});

/**
 * Create a particle that orbits over the cursor
 * @param r = (Number) Paritcle radius
 * @param radius = (Number) Orbit radius
 * @param color = (String) particle color in any accepted format
 */
class Particle {
    constructor(r, radius, color){
        this.r = r;
        this.radius = radius;
        this.color = color;
        this.x = undefined;
        this.y = undefined;
        this.angle = Math.random()*Math.PI*2;
        this.vel = Math.random()*.05 + .01;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        ctx.fill();
    }

    update() {
        if(this.x && this.y){
            this.x += (mouseX-this.x)*.08 + this.radius * Math.cos(this.angle);
            this.y += (mouseY - this.y)*.08 - this.radius * Math.sin(this.angle);
        }else{
            this.x = mouseX;
            this.y = mouseY;
        }
        this.angle += this.vel;
        this.draw();
    }
}

// Create a bunch of particles
const colors = [
    '#1abc9c',
    '#3498db',
    '#8e44ad',
    '#d35400'
];
const particles = [];
for(let i = 0; i < config.numParticles; i++){
    const r = Math.random()*config.maxParticleSize + 1;
    const radius = Math.random()*(config.maxOrbitRadius - config.minOrbitRadius) + config.minOrbitRadius;
    const color = colors[Math.floor(Math.random()*4)];
    particles.push(
        new Particle(r, radius, color)
    );
}

// Main loop for animation
(function animate(){
    requestAnimationFrame(animate);
    if(config.leaveTrace){
        ctx.fillStyle = 'rgba(255,255,255,0.1)';
        ctx.fillRect(0,0,innerWidth,innerHeight);
    }else{
        ctx.clearRect(0, 0, innerWidth, innerHeight);
    }
    particles.forEach( p => p.update());
})();
