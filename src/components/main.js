import Grid from "./grid";
import Game from "./game";
import Gallery from "./gallery";

export default function Main(controller) {

    const grid = Grid(Game.boardSize);
    const gallery = Gallery();

    function render() {
        const container = document.createElement("div");
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
            $main = gallery.render();
        } else {
            $main = grid.render();
            $main.id = `${player.toLowerCase()}-grid`;
        }

        header.textContent = player;

        side.appendChild(header);
        side.appendChild($main);
        return side;
    }

    return { render }
}