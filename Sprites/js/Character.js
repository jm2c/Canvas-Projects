// Object constructor fr the character's states
var State = function(name, frames) {
    this.name = name;
    this.active = false;
    this.frames = frames;
    this.sprites = [];
}

/**
 * Main class for the animated character
 */
class Character {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.init_y = y;
        this.width = size * 1.441;
        this.height = size;
        this.currentFrame = 0;
        this.states = {
            idle: new State('Idle', 10),
            walk: new State('Walk', 10),
            run:  new State('Run',  8 ),
            jump: new State('Jump', 12),
            dead: new State('Dead', 8 )
        };
        this.currentState = this.states.idle;
        this.states.idle.active = true;
    }

    // this method must be called before the main animation loop starts
    async loadSprites() {
        for (let s in this.states) {
            const state = this.states[s];
            for (let i = 1; i <= state.frames; i++) {
                const img = new Image();
                img.src = await `png/${state.name} (${i}).png`;
                state.sprites.push(img);
            }
        }
    }

    // Set character state
    setIdle() {
        this.currentState.active = false;
        this.currentState = this.states.idle;
        this.states.idle.active = true;
        this.currentFrame = 0;
    }
    setWalk() {
        this.currentState.active = false;
        this.currentState = this.states.walk;
        this.states.walk.active = true;
        this.currentFrame = 0;
    }
    setRun() {
        this.currentState.active = false;
        this.currentState = this.states.run;
        this.states.run.active = true;
        this.currentFrame = 0;
    }
    setJump() {
        this.currentState.active = false;
        this.currentState = this.states.jump;
        this.states.jump.active = true;
        this.currentFrame = 0;
    }
    setDead() {
        this.currentState.active = false;
        this.currentState = this.states.dead;
        this.states.dead.active = true;
        this.currentFrame = 0;
    }

    // Check if the specific state is active
    isIdle() { return this.states.idle.active; }
    isWalk() { return this.states.walk.active; }
    isRun () { return this.states.run.active;  }
    isJump() { return this.states.jump.active; }
    isDead() { return this.states.dead.active; }

    // Draws the character in canvas. Depends on the ctx global variable
    draw() {
        var keyframe = calcKeyframe(this.currentFrame, this.currentState.frames);
        var sprite = this.currentState.sprites[keyframe];
        ctx.drawImage(sprite, this.x, this.y, this.width, this.height);
    }

    update() {
        this.currentFrame++;
        var keyframe = calcKeyframe(this.currentFrame, this.currentState.frames);

        // Stop in the las keyframe when dies
        if (this.isDead() && keyframe == this.currentState.frames - 1) {
            this.currentFrame -= 2;
        }

        // Move the character in Y axis when jumping
        if (this.isJump()) {
            // a*(-(x-6)^2+36), remember that the Y axis is inverted, so in the code
            // the binomial is positive and the 36 is negative.
            // a is the force of jump.
            this.y = this.init_y + 2*((keyframe-6)**2-36);
        } else {
            this.y = this.init_y;
        }
    }
}

// Calculate the adecaute keyframe for animation
// Depends on the global speed variable
function calcKeyframe(frame, totalFrames) {
    return Math.floor(frame * speed) % totalFrames;
}