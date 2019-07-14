/**
 * Nim is a strategic game in wich two players takes turns to remove objects (balls)
 * from a finite set.
 * The classic variant: in each turn a player can take one, two or three balls and loses
 * if he can't avoid to take the last one.
 * Others variants of the game con be obtained changing the initial number of balls, the max
 * number of balls that a player can take in his turn or altering the winning rule
 * to "wins who takes the last ball".
 */

export default class Nim {
    constructor (initBalls = 20, maxBallsToTake = 3, lastBallWin = false) {
        this.balls          = initBalls;
        this.maxBallsToTake = maxBallsToTake;
        this.lastBallWin    = lastBallWin;
        this.players = [ new Player(), new Player() ];
        this.players[0].active = true;
        this.finished = false;

        // For canvas properties
        this.cBalls = []
        this.rows = Math.floor( Math.sqrt(initBalls) );
        this.cols = Math.ceil( initBalls / this.rows );
        this.ratio = this.rows / this.cols;
    }

    get active() {
        return this.players[0].active ? 0 : 1 ;
    }

    get winner() {
        if (!this.finished) return undefined;
        return this.players[0].winner ? 0 : 1;
    }

    switchPlayer() {
        this.players[0].toggleActive();
        this.players[1].toggleActive();
    }

    move (nBalls) {
        if (this.finished) return;
        if (nBalls < 1 || nBalls > this.maxBallsToTake) throw 'Illegal move';
        this.balls -= nBalls;
        this.players[this.active].add(nBalls);

        if ( this.ended() ) {
            this.finished = true;
            console.log('Winner is player ' + (this.winner+1));
        }
        this.switchPlayer();
    }

    ended() {
        if (this.balls > 0) return false;
        this.players.forEach( player => {
            if (!this.lastBallWin) {
                if ( !player.active )
                    player.winner = true;
            } else {
                if ( player.active )
                    player.winner = true;
            }
        });
        return true;
    }

    toCanvas(size) {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size * this.ratio;

        const ballRadius = size / this.cols;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (this.cBalls.length == this.balls) break;
                const ball = new Ball((j+.5)*ballRadius, (i+0.5)*ballRadius, ballRadius*.8);
                ball.index = {i:i+1, j:j+1};
                this.cBalls.push(ball);
            }
        }

        this.draw(canvas);
        return canvas;
    }

    draw(canvas) {
        canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height);
        this.cBalls.forEach( ball => {
            ball.draw(canvas);
        });
    }

    getBall(i, j) {
        for (let n = 0; n < this.cBalls.length; n++) {
            if (this.cBalls[n].index.i == i && this.cBalls[n].index.j == j) {
                return this.cBalls[n];
            }
        }
    }

    removeFromCanvas(i, j, canvas) {
        for (let n = 0; n < this.cBalls.length; n++) {
            if (this.cBalls[n].index.i == i && this.cBalls[n].index.j == j) {
                this.cBalls.splice(n, 1);
                break;
            }
        }
        this.draw(canvas);
    }

    removeSelected(canvas) {
        for (let n = this.cBalls.length-1; n >= 0; n--) {
            if (this.cBalls[n].selected) {
                this.cBalls.splice(n, 1);
            }
        }
        this.draw(canvas);
    }
}

class Player {
    constructor() {
        this.balls = 0;
        this.active = false;
        this.winner = false;
    }
    add (n) {
        this.balls += n;
    }
    toggleActive() {
        this.active = !this.active;
    }
}

class Ball {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.selected = false;
        this.index = undefined;
    }

    draw(canvas) {
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.fillStyle = this.selected ? 'forestgreen' : 'silver';
        ctx.arc(this.x, this.y, this.size / 2, 0, 2*Math.PI);
        ctx.fill();
    }
}
