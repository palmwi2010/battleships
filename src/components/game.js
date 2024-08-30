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
        this.player1.board.insertShip(0,0,2,true);
        this.player1.board.insertShip(2,1,3,true);
        this.player1.board.insertShip(4,7,3,false);
        this.player1.board.insertShip(9,0,4,true);
    }

    initPlayer2() {
        this.player2.board.insertShip(0,0,2,true);
        this.player2.board.insertShip(2,1,3,true);
        this.player2.board.insertShip(4,7,3,false);
        this.player2.board.insertShip(9,0,4,true);
    }

    init() {
        this.initPlayer1();
        this.initPlayer2();
    }

    shotFired(x, y) {
        const attackedPlayer = this.turn === 1 ? this.player2:this.player1;

        if (attackedPlayer.board.receiveAttack(x, y)) {
            if (attackedPlayer.board.checkAllSunk()) return Game.ShotResult.GAME_OVER;
            this.changeTurn();
            return Game.ShotResult.SHOT_SENT;
        }
        return Game.ShotResult.SHOT_NOT_SENT;
    }

    changeTurn() {
        this.turn = (this.turn === 1) ? 2:1;
        if (this.turn === 2 && this.player2.isComputer) {
            // Generate computer move
            const move = this.generateComputerMove();
            this.shotFired(move[0], move[1]);
            if (this.turn === 2) throw Error("Computer move wasn't successful")
        }
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
        const randIndex = Math.floor(Math.random() * possibleMoves.length);

        return possibleMoves[randIndex];
    }

    static ShotResult = {
        SHOT_NOT_SENT: 0,
        SHOT_SENT: 1,
        GAME_OVER: 2
    };
}

export default Game;