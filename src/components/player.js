import Gameboard from "./gameboard";

class Player {

    constructor(isComputer, boardSize) {
        this.isComputer = isComputer;
        this.board = new Gameboard(boardSize);
    }

    static startingShips = [2, 3, 3, 4, 5];
}

export default Player;