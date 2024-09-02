class Ship {

    constructor(length, coordinate = null, horizontal = true) {
        if (!length) throw Error("Ship requires a length to be initialized.")

        this.length = length;
        this.numHits = 0;
        this.sunk = false;
        this.coordinate = coordinate;
        this.horizontal = horizontal;
    }

    sink() {
        this.sunk = true;
    }

    isSunk() {
        return this.sunk;
    }

    hit() {
        if (!this.sunk) {
            this.numHits++;
            if (this.numHits === this.length) this.sink();
        } else {
            console.log("Warning: Attempting to hit a ship already sunk.")
        }
    }
}

export default Ship