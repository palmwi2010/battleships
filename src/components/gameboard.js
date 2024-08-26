import Ship from "./ship";

class Gameboard {

    constructor(size) {
        this.size = size;
        this.board = Array.from( {length: size}, () => Array.from( {length: size}, () => 0))
    }
}

export default Gameboard;