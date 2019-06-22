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

// Main loop for animations
(function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    // Things to update
})();