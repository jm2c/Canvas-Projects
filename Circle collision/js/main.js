import Circle from './Circle.js';

// Create the canvas and context
const canvas = document.createElement('canvas');
const ctx    = canvas.getContext('2d');
document.body.appendChild(canvas);

// Circles to test
const c1 = new Circle(canvas.width / 2, canvas.height / 2, 80, 'white');
const c2 = new Circle(0, 0, 60, 'white');

// Setup for fullscreen canvas
canvas.style.backgroundColor = 'black';
(function init(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    c1.x = canvas.width / 2;
    c1.y = canvas.height / 2;
    addEventListener('resize', init);
})();

// Get mouse coords
let mouseX, mouseY;
addEventListener('mousemove', evt => {
    mouseX = evt.x;
    mouseY = evt.y;
});

// Main loop for animations
(function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Things to update
    if ( c1.collides(c2) )
        c2.color = 'firebrick';
    else
        c2.color = 'white';

    c2.x = mouseX;
    c2.y = mouseY;
        
    c1.update(ctx);
    c2.update(ctx);
})();