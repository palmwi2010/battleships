import ControlsDisplay from "./controls-display";
import Game from "./game";
import Events from "./ship-deployment";
import Banner from "./banner";
import GameControls from "./game-controls";
import Welcome from "./welcome";
import Main from "./main";
import bodyBackground from "../assets/battle-background.webp";

class ViewController {

    constructor() {
        this.game = null;
        this.selectedShip = null;
        this.events = null;
        this.banner = Banner();
        this.gameControls = GameControls(this);
        this.main = Main(this);
        this.body = document.querySelector('body');
        this.body.style.backgroundImage = `url(${bodyBackground})`;
        this.deploymentPhase = true;
    }

    showLaunchScreen() {
        const welcome = Welcome(this);
        this.body.appendChild(welcome.render());
    }

    renderGame() {
        //TODO - Set for if vs human and control for re deployment
        this.game = new Game();
        this.body.appendChild(this.banner.render())
        this.body.appendChild(this.main.render())
        this.body.appendChild(this.gameControls.render())
    }

    initDeployment() {
        this.renderGame();
    }

    initGame() {
        //this.events = new Events(this.game, this.refreshBoard.bind(this));
        this.changeDeploymentPhase();
        this.refreshBoard();
        //this.addListeners();
    }

    changeDeploymentPhase() {
        this.deploymentPhase = false;
        this.main.render();
    }

    refreshBoard() {
        const $playerBoard = document.querySelector("#player-grid");
        const $opponentBoard = document.querySelector("#opponent-grid");

        this.#updateBoard($playerBoard, true)
        this.#updateBoard($opponentBoard, false)
    }

    #updateBoard($board, isOwnBoard = true) {
        this.main.updateBoard();
        /*
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
        }*/
    }

    addListeners() {
        // Ships
        const $ships = document.querySelectorAll(".ship");
        for (let i = 0; i < $ships.length; i++) {
            const $ship = $ships[i];
            $ship.addEventListener("mousedown", this.events.openShipDeploy);
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
}

export default ViewController;