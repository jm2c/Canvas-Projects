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

// Create elements for sounds
class Sound{
    constructor(src){
        this.sound = document.createElement('audio');
        this.sound.src = src;
        this.sound.setAttribute('preload', 'auto');
        this.sound.style.display = 'none';
        document.body.appendChild(this.sound);
        this.sound.addEventListener('ended', evt => {
            this.sound.classList.add('ended');
        });
    }
    play(){
        this.sound.play();
    }
    stop(){
        this.sound.pause();
    }
}

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

class Firework extends Particle{
    constructor(x, y, size, color){
        super(x, y, size, color);
    }
    update(){
        this.velY += g;
        this.x += this.velX;
        this.y += this.velY;
        super.draw();
    }
}

// Create a firework every click
const fireworks = [];
const particles = [];
addEventListener('click', evt => {
    const x = Math.random()*innerWidth;
    const firework = new Firework(evt.x, innerHeight, 5, 'silver');
    firework.velX = 0;
    firework.velY = -(Math.random()*8 + 5);
    fireworks.push(firework);
    const launch = new Sound('launch.mp3');
    launch.play();
});

function explode(x,y){
    const color = colors[Math.floor(Math.random()*colors.length)];
    const blow = new Sound('blow.mp3');
    blow.play();
    for(let i = 0; i < 60; i++){
        const p = new Particle(x, y, 1.5, color);
        p.velX = Math.random()*10 - 5;
        p.velY = Math.random()*10 - 5;
        particles.push(p);
    }
}

// Remove from the array the unused particles
function cleanParticles() {
    for (let i = 0; i < particles.length; i++) {
        if(particles[i].alpha < 0)
            particles.splice(i,1);
    }
}

// Explode the firework when is the top of the movement
function checkForExplosion(){
    for (let i = 0; i < fireworks.length; i++) {
        const f = fireworks[i];
        if (f.velY >= 0){
            explode(f.x, f.y);
            fireworks.splice(i, 1);
        }
    }
}

// remove the unused audio tags
function cleanAudioNodes(){
    const nodes = document.querySelectorAll('.ended');
    for (let i = 0; i < nodes.length; i++) {
        document.body.removeChild(nodes[i]);
    }
}

// Animation loop
(function animate(){
    requestAnimationFrame(animate);
    if(particles.length > 0)
        cleanParticles();
    if (fireworks.length > 0)
        checkForExplosion();
    cleanAudioNodes();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.fillRect(0,0,innerWidth,innerHeight);
    particles.forEach( p => p.update() );
    fireworks.forEach( f => f.update() );
})();