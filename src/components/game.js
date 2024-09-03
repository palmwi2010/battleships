import Player from "./player";

class Game {

    constructor() {
        this.boardsize = Game.boardSize;
        this.player1 = new Player(false, this.boardsize);
        this.player2 = new Player(true, this.boardsize);
        this.turn = 1;
        this.init()
    }

    static boardSize = 10;

    initPlayer1() {
        //this.player1.board.setRandomDeployment();
    }

    initPlayer2() {
        this.player2.board.setRandomDeployment();
    }

    init() {
        this.initPlayer1();
        this.initPlayer2();
    }

    shotFired(x, y) {
        const attackedPlayer = this.turn === 1 ? this.player2:this.player1;

        if (attackedPlayer.board.receiveAttack(x, y)) {
            this.changeTurn();
            return true;
        }
        return false;
    }

    changeTurn() {
        this.turn = (this.turn === 1) ? 2:1;
        if (this.turn === 2 && this.player2.isComputer) {
            // Generate computer move
            this.makeComputerMove();
        }
    }

    makeComputerMove() {
        // Generate computer move
        const startingHits = this.player1.board.hits.length;
        const move = this.generateComputerMove(); // Generates a move for the computer
        this.shotFired(move[0], move[1]); // Fires move and changes turn
        const endingHits = this.player1.board.hits.length;

        if (startingHits != endingHits) {
            this.addToMoveStack(move);
        }
    }

    addToMoveStack(move) {
        const opponentBoard = this.player1.board;
        const {possibleMoves} = opponentBoard;
        const [x, y] = move;

        possibleMoves.forEach(m => {
            const deltaX = Math.abs(m[0] - x);
            const deltaY = Math.abs(m[1] - y);
            if (deltaX < 2 && deltaY < 2 && (deltaX * deltaY) === 0) {
                this.player2.moveStack.push(m);
            }
        })
    }

    getActivePlayer() {
        if (this.turn === 1) {
            return this.player1;
        } else {
            return this.player2;
        }
    }

    getOpponentPlayer() {
        if (this.turn === 1) {
            return this.player2;
        } else {
            return this.player1;
        }
    }

    generateComputerMove() {
        if (!this.player2.isComputer) throw Error("Attempting to generate a computer move with no computer players.");
        const opponentBoard = this.player1.board;
        const {possibleMoves} = opponentBoard;

        if (possibleMoves.length === 0) return Error("No more possible moves remaining!");
        if (this.player2.moveStack.length > 0) {
            return this.player2.moveStack.pop();
        }
        const randIndex = Math.floor(Math.random() * possibleMoves.length);

        return possibleMoves[randIndex];
    }

    static ShotResult = {
        SHOT_NOT_SENT: 0,
        SHOT_SENT: 1,
        GAME_OVER: 2
    };

    static resultMap = {
        GAME_ENDED: 0,
        P1_WINS: 1,
        P2_WINS: 2,
        COMPUTER_WINS: 3
    }
}

export default Game;