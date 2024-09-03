import Game from "./game";
import Events from "./events";
import Banner from "./banner";
import GameControls from "./game-controls";
import Welcome from "./welcome";
import Main from "./main";
import PopupDialog from "./popup-dialog";
import bodyBackground from "../assets/battle-background.webp";
import renderFooter from "./footer";

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
        this.popupController = PopupDialog(this);
        renderFooter();
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
            this.main.clearShips();
            this.main.refreshBoard();
            this.main.render();
            this.gameControls.render();
        }
    }

    refresh() {
        this.main.refreshBoard();
        this.checkEndGame();
    }

    checkEndGame() {
        if (this.game.player1.board.checkAllSunk()) {
            this.showGameOver(Game.resultMap.P2_WINS);
        } else if (this.game.player2.board.checkAllSunk()) {
            this.showGameOver(Game.resultMap.P1_WINS);
        }
    }

    initDeployment() {
        setTimeout(() => this.popupController.renderInfo(), 700);
        this.deploymentPhase = true;
        this.renderGame();
    }

    initGame() {
        this.changeDeploymentPhase();
        this.main.refreshBoard();
        this.main.activateAttackListeners();
        //this.addListeners();
    }

    setReady() {
        this.gameControls.activateButton();
    }

    setUnready() {
        this.gameControls.deactivateButton();
    }

    changeDeploymentPhase() {
        this.deploymentPhase = false;
        this.main.render();
        this.gameControls.render();
    }

    showGameOver(gameResult) {
        const dialog = this.popupController.renderGameOver(gameResult);
        dialog.showModal();
    }
}

export default ViewController;