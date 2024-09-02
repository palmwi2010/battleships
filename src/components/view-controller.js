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
            this.gameControls.render();
        }
    }

    initDeployment() {
        this.deploymentPhase = true;
        this.renderGame();
    }

    initGame() {
        this.changeDeploymentPhase();
        this.main.refreshBoard();
        this.main.activateAttackListeners();
        //this.addListeners();
    }

    changeDeploymentPhase() {
        this.deploymentPhase = false;
        this.main.render();
        this.gameControls.render();
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
}

export default ViewController;