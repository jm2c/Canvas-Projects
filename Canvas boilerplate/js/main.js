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

// Get mouse coords
let mouseX, mouseY;
addEventListener('mousemove', evt => {
    mouseX = evt.x;
    mouseY = evt.y;
});

// Ready to use Object
class Obj {
    constructor (x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }
    draw () {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
    }
    update () {
        this.draw();
    }
}
const objs = [];
for (let i = 0; i < 1; i++) {
    objs.push(
        new Obj(canvas.width / 2, canvas.height / 2, 5)
    );
}

// Main loop for animations
(function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Things to update
    objs.forEach( obj => {
        obj.update();
    })
})();