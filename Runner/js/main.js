const canvas = document.createElement('canvas');
const ctx    = canvas.getContext('2d');

canvas.style.backgroundColor = 'black';
document.body.appendChild(canvas);
(function init(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    addEventListener('resize', init);
})();

// Game logic
const gravity = 0.18;
const playerSize = 50;
const player = new Player(100, innerHeight - playerSize / 2 - 200, playerSize);

// Animation loop
(function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    player.update();
})();