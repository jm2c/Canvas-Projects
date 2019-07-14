import Nim from './Nim.js';

// Game constants
const initBalls = 20,
      maxBallsPerTurn = 3,
      lastBallWin = false;

// Game info
let rule = lastBallWin ?
             'Last ball wins, ' :
             'Last ball loses, ';
rule += `${maxBallsPerTurn} balls per turn.`;
document.getElementById('rule').innerText = rule;
let taken = 0;
function updateLabel() {
    const info = document.getElementById('info');
    const activePlayer = game.active + 1;
    if (!game.finished) {
        info.innerText = `Player ${activePlayer} select ${taken} balls.`;
    } else {
        const winner = game.winner + 1;
        info.innerText = `Player ${winner} wins!`;
    }
}

// Draw canvas
let game = new Nim(initBalls, maxBallsPerTurn, lastBallWin);
const canvas = game.toCanvas(300);
const board = document.getElementById('board');
canvas.style.backgroundColor = '#666';
board.appendChild(canvas);
updateLabel();

// Select balls
const boundries = canvas.getBoundingClientRect();
canvas.addEventListener('click', evt => {
    const x = evt.clientX - boundries.x;
    const y = evt.clientY - boundries.y;
    const i = Math.ceil(y / (canvas.height / game.rows));
    const j = Math.ceil(x / (canvas.width / game.cols));
    const ball = game.getBall(i, j) || {};
    if (dist(ball.x, ball.y, x, y) < ball.size / 2) {
        if (ball.selected) {
            ball.selected = false;
            taken--;
        } else {
            if (taken < maxBallsPerTurn) {
                ball.selected = true;
                taken++;
            }
        }
        game.draw(canvas);
        updateLabel();
    }
});

// Change player
const btn = document.getElementById('pass');
btn.addEventListener('click', function() {
    if (taken == 0) return;
    game.move(taken);
    game.removeSelected(canvas);
    taken = 0;
    updateLabel();
});

// Calculate the distance between two points
function dist (x1, y1, x2, y2) {
    return Math.sqrt( (x2-x1)**2 + (y2-y1)**2 );
}

/**
 * Random game in console
 */
// while (!game.finished){
//     var balls = Math.floor(Math.random()*game.maxBallsToTake + 1);
//     console.log(
//         `Player ${game.active + 1} takes ${balls} balls,` +
//         `${game.balls - balls} remaining.`
//     );
//     game.move(balls);
// }
