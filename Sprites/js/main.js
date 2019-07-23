/**
 * Sprites from https://www.gameart2d.com/
 */

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const speed = 1/6;
let width = canvas.width = 400*1.441;
let height = canvas.height = 400;
let frame = 0;
document.body.appendChild(canvas);

// Background properties
let background = new Image();
let ground = new Image();
let bgPos = 0;
let grPos = 0;
async function loadBg() {
    background.src = await 'png/background.png';
    ground.src     = await 'png/ground.png';
}

const dino = new Character(width/4, height - 240, 220);

// Controls
addEventListener('keydown', evt => {
    if (evt.key == 'ArrowRight' && !dino.isWalk()) {
        dino.setWalk();
    } else if (evt.key == 'ArrowDown' && !dino.isDead()) {
        dino.setDead();
    } else if (evt.key == 'ArrowUp' && !dino.isJump()) {
        dino.setJump();
    } else if (evt.key == 'ArrowLeft' && !dino.isRun()) {
        dino.setRun();
    }
});

addEventListener('keyup', evt => {
    dino.setIdle();
});

// Main animation loop
function animate() {
    frame = requestAnimationFrame(animate);

    // Parallax
    if(dino.isWalk()) {
        grPos-= 6*speed;
        bgPos-= 1.5*speed;
    }
    if(dino.isRun()) {
        grPos-= 16*speed;
        bgPos-= 4*speed;
    }
    if(dino.isJump()) {
        grPos-= 8*speed;
        bgPos-= 2*speed;
    }
    
    // Background Draw
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < Math.ceil(width/250); i++) {
        ctx.drawImage(background, 500*i + bgPos%500, 0, 500, 375);
    }

    // Ground Draw
    for (let i = 0; i < Math.ceil(width/64); i++) {
        ctx.drawImage(ground, 128*i + grPos%128, height-50);
    }

    // Draw character
    dino.draw();
    dino.update();

    // Action text
    ctx.fillStyle = 'peru';
    ctx.font = '45px "Shojumaru", sans';
    ctx.fillText(dino.currentState.name, 20, 60);
    ctx.fill();
}

// Starts sequence animation
dino.loadSprites()
.then( loadBg )
.then( animate )
.catch(err => {
    console.error(err);
});
