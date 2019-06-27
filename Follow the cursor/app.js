// Create the canvas
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

// Adjust the canvas size
(function init(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    addEventListener('resize', init);
})();
document.body.appendChild(canvas);

// Get mouse coords
let mouseX = canvas.width / 2, mouseY = canvas.height / 2;
addEventListener('mousemove', evt => {
    mouseX = evt.x;
    mouseY = evt.y;
});

/**
 * Create a circle of the given size and color that follows the mouse
 * @param r = (Int) particle radius
 * @param color = (String) particle color
 */
class Particle {
    constructor(r, vel, color){
        this.r = r;
        this.vel = vel;
        this.color = color;
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        ctx.fill();
    }

    update() {
        this.x = this.x + (mouseX - this.x) * (this.vel / 100);
        this.y = this.y + (mouseY - this.y) * (this.vel / 100);
        this.draw();
    }
}

// Add the particle
p1 = new Particle(20, 5,  '#22a6b3');
p2 = new Particle(15, 10, '#e74c3c');
p3 = new Particle(10, 15, '#34495e');
p4 = new Particle(5,  20, '#8e44ad');
particles = [p1, p2, p3, p4];

// Main animation loop
(function animate(){
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
    });
})();
