import Gameboard from "./gameboard";

class Player {

    constructor(isComputer, boardSize) {
        this.isComputer = isComputer;
        this.board = new Gameboard(boardSize);
        this.moveStack = []; // Move stack for AI
    }
}

export default Player;