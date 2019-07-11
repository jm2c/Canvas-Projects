import Nim from './Nim.js';

const game = new Nim();

while (!game.finished){
    var balls = Math.floor(Math.random()*3 + 1);
    console.log(`Player ${game.active + 1} takes ${balls} balls, ${game.balls - balls} balls remaining.`);
    game.move(balls);
}
