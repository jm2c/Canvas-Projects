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
let mouseX, mouseY;
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
    constructor(r, color){
        this.r = r;
        this.color = color;
        this.x = undefined;
        this.y = undefined;
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
            this.x += (mouseX-this.x)*.08;
            this.y += (mouseY - this.y)*.08;
        }else{
            this.x = mouseX;
            this.y = mouseY;
        }
        this.draw();
    }
}

// Add the particle
p1 = new Particle(10, '#22a6b3');

// Main animation loop
(function animate(){
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.fillRect(0,0,innerWidth, innerHeight);
    p1.update();
})();
