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
        this.renderBoard();
    }

    renderBoard() {
        const $playerBoard = document.querySelector("#player-grid");
        const $opponentBoard = document.querySelector("#opponent-grid");

        const activePlayer = this.game.getActivePlayer();
        const opponentPlayer = this.game.getOpponentPlayer();

        // Function to outsource
        const $boxes = $playerBoard.querySelectorAll(".box");
        let boxIndex = 0;
        for (let i = 0; i < this.game.boardsize; i++) {
            const row = activePlayer.board.board[i];
            for (let j = 0; j < this.game.boardsize; j++) {
                const square = row[j];
                const $box = $boxes[boxIndex];
                console.log(square);
                if (square !== 0) {
                    $box.style.backgroundColor = "red";
                }
                boxIndex++;
            }
        }
    }

}

export default ViewController;