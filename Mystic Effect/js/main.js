import Particle from './Particle.js';

// Create the canvas and context
const canvas = document.createElement('canvas');
const ctx    = canvas.getContext('2d');
document.body.appendChild(canvas);

// Setup for fullscreen canvas
canvas.style.backgroundColor = 'black';
(function init(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    addEventListener('resize', init);
})();

let mouseX, mouseY;
addEventListener('mousemove', evt => {
    mouseX = evt.x;    
    mouseY = evt.y;
});

const particles = [], pool = [];
for (let i = 0; i < 100; i++) {
    const newParticle = new Particle(0, 0, 0, 0, 0, 0);
    resetParticle (newParticle);
    pool.push(newParticle);
}

function resetParticle(particle) {
    particle.alpha = 1;
    particle.x = mouseX;
    particle.y = mouseY;
    particle.size = Math.random()*10 + 10;
    particle.velX = Math.random() - 0.5;
    particle.velY = Math.random() - 0.5;
    return particle;
}
        
// Main loop for animations
let hue;
(function animate(){
    let frame = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Things to update
    hue = frame % 360;

    if (pool.length > 0){
        particles.push(resetParticle(pool.pop()));
    }
    if (particles[0].alpha <= 0){
        pool.push(particles.shift());
    }
    for(let i = 0; i < particles.length; i++) {
        particles[i].hue = hue;
        particles[i].update(ctx);
    }
    console.log(particles.length);
    
})();