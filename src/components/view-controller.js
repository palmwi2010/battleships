import Player from "./player";
import welcome from "./welcome";
import Game from "./game";
import render from "../game-display";

class ViewController {

    constructor() {
        welcome(this);
        this.game = null;
    }

    initGame(isVsComputer) {
        if (isVsComputer) {
            this.game = new Game();
        } else {
            console.log("Let's play against the human.")
        }
        render(this.game.boardsize);
    }

}

export default ViewController;