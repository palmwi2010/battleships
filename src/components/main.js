import Grid from "./grid";
import Gallery from "./gallery";

export default function Main(controller) {

    const playerGrid = Grid(controller);
    const opponentGrid = Grid(controller);
    const gallery = Gallery();

    const container = document.createElement("div");
    container.className = "game-container";

    function render() {
        
        // Remove any existing children
        while (container.firstChild) container.removeChild(container.firstChild);

        const leftSide = controller.deploymentPhase ? "Gallery":"Player";
        const rightSide = controller.deploymentPhase ? "Player":"Opponent";

        const $leftSide = renderSide(leftSide);
        const $rightSide = renderSide(rightSide);
    
        container.appendChild($leftSide);
        container.appendChild($rightSide);
        
        return container;
    }

    function renderSide(player) {
        const side = document.createElement("div");
        side.className = "main-section";
        const header = document.createElement("h2");
        header.className = "player-name";
        header.textContent = player;

        let $main;
        if (player === "Gallery") {
            $main = gallery.getContainer();
        } else if (player === "Player") {
            $main = playerGrid.getContainer();
            $main.id = "player-grid";
        } else {
            $main = opponentGrid.getContainer();
            $main.id = "opponent-grid";
        }

        side.appendChild(header);
        side.appendChild($main);
        return side;
    }

    function refreshBoard() {
        if (controller.deploymentPhase) gallery.updateGallery();
        playerGrid.updateGrid(controller.game.getActivePlayer(), true);
        opponentGrid.updateGrid(controller.game.getOpponentPlayer(), false);
    }

    function activateAttackListeners() {
        opponentGrid.activateListeners();
    }

    return { render, refreshBoard, activateAttackListeners }
}