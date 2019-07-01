// Create the canvas and context
const canvas = document.createElement('canvas');
const ctx    = canvas.getContext('2d');
const size = innerHeight*.7;
canvas.width = size;
canvas.height = size;
document.body.appendChild(canvas);

// Init the game
let game, players, activePlayer, finished;
function init() {
    game = new TicTacToe();
    players = [game.player1, game.player2];
    activePlayer = players[0];
    finished = false;
    ctx.clearRect(0, 0, size, size);
    drawBoard();
}
init();

// Move when user clicks the board
addEventListener('click', evt => {
    // Calculate the coords of the clicked cell
    const s = canvas.width / 3;
    const x = evt.clientX - canvas.getBoundingClientRect().x;
    const y = evt.clientY - canvas.getBoundingClientRect().y;
    let i = Math.floor(x / s),
        j = Math.floor(y / s);

    // Move and check if the game has finished
    if (finished) {
        init();
    } else {
        game.play(activePlayer, i, j);
        if (activePlayer == players[0]) {
            drawX(i, j);
        }else {
            drawO(i, j);
        }
        switchPlayer();
        if (game.checkWin()){
            finished = true;
            drawWinnerLine();
        }
        if(game.isFull()) {
            finished = true;
        }
    }
});

// Calculate and draw the final line if there is a winner
function drawWinnerLine() {
    const color = 'darkviolet';
    const weight = 8;
    
    // Vertical line
    if (game.winnerLine.dir == 'col') {
        line (
            game.winnerLine.n * size / 3 + size / 6,
            0,
            game.winnerLine.n * size / 3 + size / 6,
            size,
            weight, color
        );
    }
    
    // Horizontal line
    else if (game.winnerLine.dir == 'row') {
        line (
            0,
            game.winnerLine.n * size / 3 + size / 6,
            size,
            game.winnerLine.n * size / 3 + size / 6,
            weight, color
        );
    }
    
    // Diagonal
    else {
        if (game.winnerLine.n == 0) {
            line(0, 0, size, size, weight, color);
        } else {
            line(size, 0, 0, size, weight, color);
        }
    }
}

// For change player each turn
function switchPlayer(){
    activePlayer = activePlayer == players[0] ? players[1] : players[0];
}

// Aux. function to draw a line in canvas
function line (x1, y1, x2, y2, width = 3, color = 'black') {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

// Draw a cross simbol in ij-nth cell 
function drawX (i, j) {
    const s = canvas.width / 3;
    const off = canvas.width / 4;
    line(i*s+off, j*s+off, i*s+s-off, j*s+s-off, 4, 'red');
    line(i*s+s-off, j*s+off, i*s+off, j*s+s-off, 4, 'red');
}

// Draw a circle in ij-nth cell
function drawO (i, j) {
    const s = canvas.width / 3;
    const off = s / 2;
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(i*s + off, j*s + off, s/3, 0, 2 * Math.PI);
    ctx.stroke();
}

// Draw the classic tic tac toe 9 cells board
function drawBoard(){
    const s = canvas.width;
    line(0, s/3, s, s/3);
    line(0, 2*s/3, s, 2*s/3);
    line(s/3, 0, s/3, s);
    line(2*s/3, 0, 2*s/3, s);
}

