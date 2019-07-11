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
    constructor (initBalls = 20, maxBallsToTake = 3, lastBallLose = true) {
        this.balls          = initBalls;
        this.maxBallsToTake = maxBallsToTake;
        this.lastBallLose   = lastBallLose;
        this.players = [ new Player(), new Player() ];
        this.players[0].active = true;
        this.finished = false;
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
            if (this.lastBallLose) {
                if ( !player.active )
                    player.winner = true;
            } else {
                if ( player.active )
                    player.winner = true;
            }
        });
        return true;
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
