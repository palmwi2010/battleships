import ControlsDisplay from "./controls-display";
import Game from "./game";
import render from "./game-display";

class ViewController {

    constructor() {
        this.game = null;
    }

    showLaunchScreen() {
        const controlsDisplay = new ControlsDisplay(this);
        controlsDisplay.renderLaunchScreen();
    }

    initGame(isVsComputer) {
        if (isVsComputer) {
            if (this.game) ViewController.#clearGame();
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

    static #clearGame() {
        const body = document.querySelector("body");
        body.innerHTML = "";
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

    showGameOver(gameResult) {
        const controlsDisplay = new ControlsDisplay(this);
        const dialog = controlsDisplay.renderGameOver(gameResult);
        dialog.showModal();
    }

    sendAttack(e) {
        const box = e.currentTarget;
        const {x} = box.dataset;
        const {y} = box.dataset;
        const result = this.game.shotFired(Number(x),Number(y));

        if (result === Game.ShotResult.SHOT_SENT) {
            this.refreshBoard();
        } else if (result === Game.ShotResult.GAME_OVER) {
            // Handle end game display
            if (this.game.turn === 1) {
                this.showGameOver(ControlsDisplay.gameResult.P1_WINS)
            } else {
                if (this.game.player2.isComputer) {
                    this.showGameOver(ControlsDisplay.gameResult.COMPUTER_WINS);
                } else {
                    this.showGameOver(ControlsDisplay.gameResult.P2_WINS);
                }
            }
        }
    }
}

export default ViewController;