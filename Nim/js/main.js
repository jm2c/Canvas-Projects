import Nim from './Nim.js';

const game = new Nim(100, 15, false);

while (!game.finished){
    var balls = Math.floor(Math.random()*15 + 1);
    console.log(
        `Player ${game.active + 1} takes ${balls} balls,` +
        `${game.balls - balls} remaining.`
    );
    game.move(balls);
}
