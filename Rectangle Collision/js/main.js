// Create the canvas and context
const canvas = document.createElement('canvas');
const ctx    = canvas.getContext('2d');
document.body.appendChild(canvas);

let mouseX, mouseY;
addEventListener('mousemove', evt => {
    mouseX = evt.x;
    mouseY = evt.y;
});

// Setup for fullscreen canvas
canvas.style.backgroundColor = 'black';
(function init(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    addEventListener('resize', init);
})();

const rect1 = new Rectangle(0, 0, 300, 80, 'white');
const rect2 = new Rectangle(0, 0, 100, 200, 'white');

// Main loop for animations
(function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    // Things to update
    rect1.x = canvas.width / 2;
    rect1.y = canvas.height / 2;
    rect2.x = mouseX;
    rect2.y = mouseY;
    rect2.color = rect2.colide(rect1) ? 'firebrick' : 'white';
    rect1.update(ctx);
    rect2.update(ctx);
})();