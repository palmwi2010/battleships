import Grid from "./grid";
import Game from "./game";
import Gallery from "./gallery";

export default function Main(controller) {

    const playerGrid = Grid(Game.boardSize);
    const opponentGrid = Grid(Game.boardSize);
    const gallery = Gallery();

    const container = document.createElement("div");

    function render() {
        
        // Remove any existing children
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        container.className = "game-container";

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
        header.className = "player-name"

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

        header.textContent = player;

        side.appendChild(header);
        side.appendChild($main);
        return side;
    }

    return { render }
}