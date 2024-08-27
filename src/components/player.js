import Gameboard from "./gameboard";

class Player {

    constructor(isComputer, boardSize) {
        this.isComputer = isComputer;
        this.board = new Gameboard(boardSize);
    }
}

export default Player;