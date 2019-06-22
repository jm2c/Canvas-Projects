const canvas = document.createElement('canvas');
const ctx    = canvas.getContext('2d');

canvas.style.backgroundColor = 'black';
document.body.appendChild(canvas);
(function init(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    addEventListener('resize', init);
})();

/**
 * Game Elements
 */
const gravity = 0.18;

// Player
const playerSize = 40,
      player = new Player(
        2 * playerSize,
        innerHeight - playerSize / 2 - 200,
        playerSize);
// Obstacles
const maxObstacles = 4,
      obstacleSize = 60,
      obstaclesVel = 5,
      obstaclesProb = 1;
      obstacles = [];
function addObstacle(){
    if (obstacles.length >= maxObstacles)
        return;
    const obs = new Obstacle(undefined, undefined, obstacleSize);
    obs.x = innerWidth + obstacleSize*.1;
    obs.y = innerHeight - obstacleSize;
    obstacles.push(obs);
}

// Animation loop
(function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    player.update();
    obstacles.forEach( obst => obst.update() );
    if (Math.random() < obstaclesProb / 100)
        addObstacle();
    for(let i = 0; i < obstacles.length; i++) {
        if (obstacles[i].right < 0)
            obstacles.splice(i, 1);
    }
})();