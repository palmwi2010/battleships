import Game from "./game";
import Events from "./events";

export default function Grid(controller) {

    const container = document.createElement("div");
    container.className = "grid-container";

    const size = Game.boardSize;
    const $boxes = [];
    render();

    function render() {

        const rowColCoordinates = document.createElement("div");
        rowColCoordinates.className = "grid-row";
        rowColCoordinates.appendChild(columnCoordinate());

        for (let i = 0; i < size; i++) {
            const row = document.createElement("div");
            row.className = "grid-row";
            row.appendChild(rowCoordinate(i));
            rowColCoordinates.appendChild(columnCoordinate(i))

            for (let j = 0; j < size; j++) {
                const box = document.createElement("div");
                box.className = "box";

                // X and Y co-ordinate tracking
                box.setAttribute("data-x", i);
                box.setAttribute("data-y", j);

                const innerBox = document.createElement("div");
                innerBox.className = "inner-box";

                box.appendChild(innerBox);
                row.appendChild(box);

                $boxes.push(box);
            }
            container.appendChild(row);
        }
        container.appendChild(rowColCoordinates);
    }

    function getContainer() {
        return container;
    }

    function updateGrid(player, isOwnBoard) {
        const newState = player.board.board.flat();

        for (let i = 0; i < newState.length; i++) {
            const square = newState[i];
            const $box = $boxes[i]; 
            $box.className = "box"; // Reset class name

            switch(square) {
                case 0:
                    break;
                case 1: 
                    $box.classList.add("box-miss");
                    break;
                case 2:
                    $box.classList.add("box-hit");
                    break;
                default:
                    if (isOwnBoard) $box.classList.add("box-ship");
                    break;
            }
        }
    }

    function activateListeners() {
        const events = Events(controller);
        $boxes.forEach(box => {
            box.addEventListener("click", events.sendAttack);
        });
    }

    function rowCoordinate(index) {
        const rowCoordinate = document.createElement("p");
        rowCoordinate.classList.add("coordinate");
        const character = String.fromCharCode("A".charCodeAt(0) + index);
        rowCoordinate.textContent = character;
        return rowCoordinate;
    }

    function columnCoordinate(index) {
        const columnCoordinate = document.createElement("p");
        columnCoordinate.classList.add("coordinate");
        if (index != undefined) columnCoordinate.textContent = index;
        return columnCoordinate;
    }

    return { getContainer, updateGrid, activateListeners }
}