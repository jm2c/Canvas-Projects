import Cloud from './Cloud.js';

// Create the canvas and context
const canvas = document.getElementById('clouds');
const ctx = canvas.getContext('2d');

// Setup for fullscreen canvas
(function init() {
    canvas.width = innerWidth;
    addEventListener('resize', init);
})();

const clouds = [];
for (let i = 0; i < 8; i++) {
    const size = Math.random() * 20 + 5 | 0;
    const height = Math.random() * (canvas.height / 2) + 2 * size | 0;
    const vel = - size * 0.05;
    clouds.push(
        new Cloud(
            Math.random() * canvas.width + 100,
            height,
            size,
            vel
        )
    );
}

// Main loop for animations
(function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    // Clear invisible clouds
    for (let c = 0; c < clouds.length; c++) {
        if (clouds[c].x < - 6 * clouds[c].size) {
            clouds[c].x = canvas.width + 6 * clouds[c].size;
        }
    }
    
    // Animate every single cloud    
    clouds.forEach(cloud => {
        cloud.update(ctx);
    });
})();
