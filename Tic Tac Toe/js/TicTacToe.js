class TicTacToe {
    constructor() {
        this.player1 = 'x';
        this.player2 = 'o';
        this.winnerLine = {
            n: undefined, // 0, 1, 2
            dir: undefined // col, row, diag
        };
        this.spaces = 9;
        this.winner;
        this.board = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8]
        ];
    }

    coord(i, j) {
        return this.board[i][j];
    }

    play(symbol, i, j) {
        if (this.checkWin() || this.isFull())
            return;

        if (!validPlayer(symbol, this.player1, this.player2))
            throw "Invalid player symbol";

        if (i > 2 || i < 0 || j > 2 || j < 0)
            throw "Out of boundries move";

        if (this.coord(i,j) == this.player1 || this.coord(i,j) == this.player2)
            throw "Already played";

        this.board[i][j] = symbol;
        this.spaces--;
    }

    setWinner(symbol) {
        if (validPlayer(symbol, this.player1, this.player2)) {
            this.winner = symbol;
        } else {
            throw "Invalid player";
        }
    }

    isFull() {
        return !(this.spaces > 0);
    }

    checkWin() {
        for (let i = 0; i < 3; i++) {
            if (
                this.coord(i, 0) == this.coord(i, 1) &&
                this.coord(i, 1) == this.coord(i, 2)) {
                    this.setWinner(this.coord(i,0));
                    this.winnerLine.n = i;
                    this.winnerLine.dir = 'col';
                    return true;
            }
        }

        for (let j = 0; j < 3; j++) {
            if (
                this.coord(0, j) == this.coord(1, j) &&
                this.coord(1, j) == this.coord(2, j)) {
                    this.setWinner(this.coord(0,j));
                    this.winnerLine.n = j;
                    this.winnerLine.dir = 'row';
                    return true;
            }
        }

        if (
            this.coord(0,0) == this.coord(1,1) &&
            this.coord(1,1) == this.coord(2,2)
        ) {
            this.setWinner(this.coord(0,0));
            this.winnerLine.n = 0;
            this.winnerLine.dir = 'diag';
            return true;
        }
        if (
            this.coord(0,2) == this.coord(1,1) &&
            this.coord(1,1) == this.coord(2,0)
        ) {
            this.setWinner(this.coord(0,2));
            this.winnerLine.n = 2;
            this.winnerLine.dir = 'diag';
            return true;
        }
        return false;
    }

    randomMove(activePlayer) {
        if(!this.checkWin()) {
            try {
                let i = Math.floor(Math.random()*3);
                let j = Math.floor(Math.random()*3);
                this.play(activePlayer, i, j);
            } catch (e){
                randomMove();
            }
        }
    }

    toString() {
        let str = '\n';
        for(let j = 0; j < 3; j++) {
            for (let i = 0; i < 3; i++) {
                if (this.coord(i,j) == this.player1)
                    str += this.player1;
                else if (this.coord(i,j) == this.player2)
                    str += this.player2;
                else
                    str += '-';
            }
            str += '\n';
        }
        return str;
    }
}

function validPlayer(symbol, player1, player2) {
    return symbol == player1 || symbol == player2;
}
