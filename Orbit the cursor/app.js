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
        this.angle = 0;
    }

    draw() {
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        ctx.stroke();
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
        this.angle += 0.05;
        this.draw();
    }
}

// Create a particle
p1 = new Particle(5, 5, '#22a6b3');


// Main loop for animation
(function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    p1.update();
})();
