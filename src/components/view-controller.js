import ControlsDisplay from "./controls-display";
import Game from "./game";
import Events from "./events";
import Banner from "./banner";
import GameControls from "./game-controls";
import Welcome from "./welcome";
import Main from "./main";
import PopupDialog from "./popup-dialog";
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
        if (!this.game) {
            this.game = new Game();
            this.body.appendChild(this.banner.render())
            this.body.appendChild(this.main.render())
            this.body.appendChild(this.gameControls.render())
        } else {
            this.game = new Game();
            this.main.refreshBoard();
            this.main.render();
            this.gameControls.resetButton();
        }
    }

    initDeployment() {
        this.deploymentPhase = true;
        this.renderGame();
    }

    initGame() {
        //this.events = new Events(this.game, this.refreshBoard.bind(this));
        this.changeDeploymentPhase();
        this.main.refreshBoard();
        this.main.activateAttackListeners();
        //this.addListeners();
    }

    changeDeploymentPhase() {
        this.deploymentPhase = false;
        this.main.render();
    }

    addListeners() {
        // Ships
        const $ships = document.querySelectorAll(".ship");
        for (let i = 0; i < $ships.length; i++) {
            const $ship = $ships[i];
            $ship.addEventListener("mousedown", this.events.openShipDeploy);
        }
    }

    showGameOver(gameResult) {
        const popupController = PopupDialog(this);
        const dialog = popupController.renderGameOver(gameResult);
        dialog.showModal();
    }

    sendAttack(e) {
        const box = e.currentTarget;
        const {x} = box.dataset;
        const {y} = box.dataset;
        const result = this.game.shotFired(Number(x),Number(y));

        if (result === Game.ShotResult.SHOT_SENT) {
            this.main.refreshBoard();
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