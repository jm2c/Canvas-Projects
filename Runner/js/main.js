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
const gravity = 0.2;

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
      obstaclesProb = 1,
      obstacles = [];
let now,
    then = Date.now(),
    dt,
    Delta = 900;
function addObstacle(){
    now = Date.now();
    dt = now - then;
    if (obstacles.length >= maxObstacles || dt < Delta)
        return;
    then = now;
    const obs = new Obstacle(undefined, undefined, obstacleSize);
    obs.x = canvas.width + obstacleSize*.1;
    obs.y = canvas.height - obstacleSize;
    obstacles.push(obs);
}

/**
 * Game logic
 */
let gameOver = false;
// Jump
addEventListener('keypress', evt => {
    if (evt.keyCode === 32 && player.velY == 0)
        player.velY -= player.jumpForce;
});

// Animation loop
(function animate(){
    let frame;
    if (!gameOver)
        frame = requestAnimationFrame(animate);

    // update score
    if (frame % 8 == 0){
        player.score++;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.update(ctx);

    obstacles.forEach( obst => {
        obst.update(ctx);

        // Collision detect
        if (
            player.right  > obst.left &&
            player.left   < obst.right &&
            player.bottom > obst.top
        ) {
            gameOver = true;
        }
    } );
    // Add obstacles
    if (Math.random() < obstaclesProb / 100)
        addObstacle();
    
    // Remove unused obstacles
    for(let i = 0; i < obstacles.length; i++) {
        if (obstacles[i].right < 0)
            obstacles.splice(i, 1);
    }
})();