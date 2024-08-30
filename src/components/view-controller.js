import ControlsDisplay from "./controls-display";
import Game from "./game";
import render from "./game-display";

class ViewController {

    constructor() {
        this.game = null;
        this.selectedShip = null;
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
        // Ships
        const $ships = document.querySelectorAll(".ship");
        for (let i = 0; i < $ships.length; i++) {
            const $ship = $ships[i];
            $ship.addEventListener("mousedown", e => this.openShipDeploy(e));
        }

        // Squares
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

    openShipDeploy(e) {
        document.body.style.userSelect = 'none';

        const {ship} = e.currentTarget.dataset;
        const {board} = this.game.getActivePlayer();
        const $boxes = document.querySelectorAll(".box");
        const {possibleMoves} = board;

        for (let i = 0; i < possibleMoves.length; i++) {
            const move = possibleMoves[i];
            const $box = $boxes[i]
            if (board.isSpaceAvailable(move[0], move[1], ship, "horizontal")) {
                console.log("Found one");
                $box.classList.add("box-free");
            }
        }
        // Listen for the mouseup
        this.selectedShip = ship;
        document.addEventListener('mouseup', this.closeShipDeploy);
    }

    closeShipDeploy = (e) => {

        // Get the div it occurred in
        let clickedElement = e.target;
        
        // Move to the box div if in an inner box
        if (clickedElement.classList.contains('inner-box')) {
            clickedElement = clickedElement.parentElement;
        }

        // Check if it was a valid entry
        console.log(clickedElement);
        if (clickedElement.classList.contains("box")) {
            console.log("here")
            const {x} = clickedElement.dataset;
            const {y} = clickedElement.dataset;
            if (this.game.getActivePlayer().board.insertShip(Number(x), Number(y), this.selectedShip)) {
                this.refreshBoard();
            };
        }

        // Remove all temporary styling and listeners
        document.querySelectorAll(".box-free").forEach(element => {
            element.classList.remove("box-free");
        });
        document.body.style.userSelect = '';
        document.removeEventListener('mouseup', this.closeShipDeploy);
        this.selectedShip = null;
    }
}

export default ViewController;