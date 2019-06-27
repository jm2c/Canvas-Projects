import Bubble from './Bubble.js';

// Create the canvas and context
const canvas = document.createElement('canvas');
const ctx    = canvas.getContext('2d');
document.body.appendChild(canvas);

// Setup for fullscreen canvas
(function init(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    addEventListener('resize', init);
})();

const colors = [
    'forestgreen',
    'royalblue',
    'crimson',
    'darkorchid',
];
const bubbles = [];

function addBubble(){
    const r = 60,
    x = -r,
    y = canvas.height - r,
    velX = Math.random() + 1,
    velY = -Math.random() - 1,
    color = colors[Math.floor(Math.random() * colors.length)];
    bubbles.push(
        new Bubble(x, y, r, velX, velY, color)
    );
}

setInterval( () => {
    if (bubbles.length <= 20)
        addBubble();
    else
        clearInterval();
}, 1000);

// Main loop for animations
(function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Things to update
    for (let i = 0; i < bubbles.length; i++) {
        if (!bubbles[i].isNew()){
            if (bubbles[i].x + bubbles[i].r > canvas.width || bubbles[i].x - bubbles[i].r < 0) 
                bubbles[i].velX *= -1;
            if (bubbles[i].y + bubbles[i].r > canvas.height || bubbles[i].y - bubbles[i].r < 0)
                bubbles[i].velY *= -1;
        }
        bubbles[i].update(ctx);
    }
})();