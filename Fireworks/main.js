// Create the canvas
const canvas = document.createElement('canvas');
const ctx    = canvas.getContext('2d');

// Apend the canvas to the document body and adjust the size
canvas.style.backgroundColor = 'black';
document.body.appendChild(canvas);
(function init(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    addEventListener('resize', init);
})();

// some constants for gravity effect and colors
const g = 0.0981;
const colors = [
    'white',
    'yellow',
    'red',
    'blue',
    'lime',
];

// To create particles
class Particle{
    constructor(x, y, size, color){
        this.x = x;
        this.y = y;
        this.alpha = 1;
        this.size = size;
        this.color = color;
        this.velY = 0;
        this.velX = 0;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.fill();
        ctx.restore();
    }
    update(){
        this.velY += g;
        this.x += this.velX;
        this.y += this.velY;
        this.alpha -= 0.01;
        this.draw();
    }
}

// Create a firework every click
particles = [];
addEventListener('click', evt => {
    const color = colors[Math.floor(Math.random()*colors.length)];
    for(let i = 0; i < 60; i++){
        const p = new Particle(evt.x, evt.y, 1.5, color);
        p.velX = Math.random()*10 - 4;
        p.velY = Math.random()*10 - 5;
        particles.push(p);
    }
});

// Remove from the array the unused particles
function cleanParticles() {
    for(let i = 0; i < particles.length; i++){
        if(particles[i].alpha < 0)
            particles.splice(i,1);
    }
}

// Animation loop
(function animate(){
    requestAnimationFrame(animate);
    if(particles.length > 0)
        cleanParticles();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.fillRect(0,0,innerWidth,innerHeight);
    particles.forEach( p => p.update() );
})();