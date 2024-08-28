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
        this.addListeners();
        this.refreshBoard();
    }

    refreshBoard() {
        const $playerBoard = document.querySelector("#player-grid");
        const $opponentBoard = document.querySelector("#opponent-grid");

        this.#updateBoard($playerBoard, true)
        this.#updateBoard($opponentBoard, false)
    }

    #updateBoard($board, isOwnBoard = true) {
        const player = isOwnBoard ? this.game.getActivePlayer():this.game.getOpponentPlayer();
        const $boxes = $board.querySelectorAll(".box");
        let boxIndex = 0;
    
        for (let i = 0; i < this.game.boardsize; i++) {
            const row = player.board.board[i];
            for (let j = 0; j < this.game.boardsize; j++) {
                const square = row[j];
                const $box = $boxes[boxIndex];
                $box.className = "box";
                if (square === 0) {
                    $box.classList.add("box-empty");
                } else if (square === 1) {
                    $box.classList.add("box-miss");
                } else if (square === 2) {
                    $box.classList.add("box-hit");
                }
                else {
                    if (isOwnBoard) {
                        $box.classList.add("box-ship");
                    } else {
                        $box.classList.add("box-empty");
                    }
                        
                }
                boxIndex++;
            }
        }
    }

    addListeners() {
        const opponentBoard = document.querySelector("#opponent-grid");
        const squares = opponentBoard.querySelectorAll(".box");
        squares.forEach(square => square.addEventListener("click", e => this.sendAttack(e)));
    }

    sendAttack(e) {
        const box = e.currentTarget;
        const {x} = box.dataset;
        const {y} = box.dataset;
        const player = this.game.getOpponentPlayer();
        player.board.receiveAttack(x, y);
        this.game.changeTurn();
        this.refreshBoard();
    }
}

export default ViewController;