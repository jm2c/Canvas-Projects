/**
 * Sprites from https://www.gameart2d.com/free-dino-sprites.html
 */

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = 400*1.441;
let height = canvas.height = 400;
let bgColor = canvas.style.backgroundColor = '#5A5';
let frame = 0;
let spriteFrame = 0;
let keyFrame;
let state;
document.body.appendChild(canvas);

// Character states
const states = [
    {name: 'Dead', active:false, startFrame: 0 , endFrame: 7 }, // 0
    {name: 'Idle', active:false, startFrame: 8,  endFrame: 17}, // 1
    {name: 'Jump', active:false, startFrame: 18, endFrame: 29}, // 2
    {name: 'Run',  active:false, startFrame: 30, endFrame: 37}, // 3
    {name: 'Walk', active:false, startFrame: 38, endFrame: 47}, // 4
];
state = states[1];
state.active = true;

// Image properties
const imgRatio = 1.441;
const imgHeight = 200;
const imgWidth = imgHeight*imgRatio;
let sprites = [];
async function loadSprites () {
    for (let s in states) {
        var state = states[s]
        for (let i = state.startFrame+1; i <= state.endFrame+1; i++) {
            let img = new Image();
            img.src = await `png/${state.name} (${i-state.startFrame}).png`;
            sprites.push(img);
        }
    }
}

// Controls
addEventListener('keydown', evt => {
    if (evt.key == 'ArrowRight' && !states[4].active) {
        state.active = false;
        state = states[4];
        state.active = true;
        spriteFrame = 0;
    } else if (evt.key == 'ArrowDown' && !states[0].active) {
        state.active = false;
        state = states[0];
        state.active = true;
        spriteFrame = 0;
    } else if (evt.key == 'ArrowUp' && !states[2].active) {
        state.active = false;
        state = states[2];
        state.active = true;
        spriteFrame = 0;
    } else if (evt.key == 'ArrowLeft' && !states[3].active) {
        state.active = false;
        state = states[3];
        state.active = true;
        spriteFrame = 0;
    }
});
addEventListener('keyup', evt => {
    state.active = false;
    state = states[1];
    state.active = true;
    spriteFrame = 0;
});

// Main animation loop
function animate() {
    frame = requestAnimationFrame(animate);
    spriteFrame++;
    
    const df = state.endFrame - state.startFrame + 1;
    const kf = state.startFrame + (Math.floor(spriteFrame / 6) % df);
    if (keyFrame != kf) {
        keyFrame = kf;

        let x, y;
        x = width / 4;
        y = height - imgHeight;
        if (states[2].active) {
            // -(x-6)^2+36, remember that the Y axis is inverted, so in the code
            // the binomial is positive and the 36 is negative.
            y += 2*((kf-state.startFrame-6)**2-36);
        }

        if (states[0].active && keyFrame == states[0].endFrame) {
            spriteFrame-=2;
            return;
        }
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = 'darkolivegreen';
        ctx.fillRect(0, height-50, width, 50);
        ctx.fill();  
        ctx.fillStyle = 'peru';
        ctx.font = '45px sans';
        ctx.fillText(state.name, 20, 60);
        ctx.fill();
        ctx.drawImage(sprites[keyFrame], x, y, imgWidth, imgHeight);
    }
}

loadSprites()
.then( () => {
    animate ();
} )
.catch(err => {
    console.error(err);
});