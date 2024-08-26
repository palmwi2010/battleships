import Ship from "./ship";

class Gameboard {
    // Gameboard class for Battleships
    // Board schema:
    // 0: Empty
    // 1: Miss
    // 2: Hit
    // Ship: Ship

    constructor(size) {
        this.size = size;
        this.board = Array.from( {length: size}, () => Array.from( {length: size}, () => 0))
        this.ships = [];
        this.hits = [];
        this.misses = [];
    }

    insertShip(x, y, length, horizontal = true) {
        // Check initial inputs
        if (x < 0 || x >= this.size || y < 0 || y >= this.size) throw Error("Co-ordinates outside bounds.")
        if (length < 1 || length >= this.size) throw Error("Length must be positive and less than board size.")

        // Check no other ships in this space
        if (!this.#isSpaceAvailable(x, y, length, horizontal)) return false;

        // Create and insert new ship
        this.#updateBoardWithShip(x,y,length,horizontal);
        return true;
    }

    receiveAttack(x, y) {
        if (this.board[x][y] instanceof Ship) {
            this.board[x][y].hit();
            this.board[x][y] = 2;
        } else {
            this.board[x][y] = 1;
        }
    }

    #isSpaceAvailable(x, y, length, horizontal) {
        // Find all co-ordinates
        for (let index = 0; index < length; index++) {
            const x_ = x + (horizontal ? 0:index);
            const y_ = y + (horizontal ? index:0);

            // Check not out of bounds
            if (x_ >= this.size || y_ >= this.size) {
                console.log("Attempting to insert a ship out of bounds");
                return false;
            }

            // Check no other ships
            if (this.board[x_][y_] instanceof Ship) {
                console.log("Attempting to overwrite another ship.")
                return false;
            }
        }
        return true;
    }

    #updateBoardWithShip(x, y, length, horizontal) {
        const ship = new Ship(length);
        for (let index = 0; index < length; index++) {
            const x_ = x + (horizontal ? 0:index);
            const y_ = y + (horizontal ? index:0);
            this.board[x_][y_] = ship;
        }
        this.ships.push(ship);
    }
}

export default Gameboard;