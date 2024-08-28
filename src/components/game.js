import Player from "./player";

class Game {

    constructor() {
        this.boardsize = 10;
        this.player1 = new Player(false, this.boardsize);
        this.player2 = new Player(true, this.boardsize);
        this.turn = 1;
        this.init()
    }

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
            this.changeTurn();
        }
    }

    changeTurn() {
        this.turn = (this.turn === 1) ? 2:1;
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
        const shots = this.player1.board.misses.concat(this.player1.board.hits);
        return shots;
    }
}

export default Game;