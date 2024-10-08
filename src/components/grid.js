import Game from "./game";
import Events from "./events";
import ShipRender from "./ship-render";

export default function Grid(controller) {

    const container = document.createElement("div");
    container.className = "grid-container";

    const size = Game.boardSize;
    const $boxes = [];
    const shipRender = ShipRender();
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
            if ($box.lastElementChild.tagName === "IMG") {
                $box.lastElementChild.remove();
            }

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

        showBoats(player, isOwnBoard);
    }

    function showBoats(player, isOwnBoard) {
        const {ships} = player.board;

        ships.forEach(ship => {
            if (!isOwnBoard && !ship.sunk) return; // Only my own boats and sunk boats
            const [x, y] = ship.coordinate;
            const $box = $boxes[coordToIndex(x, y)];
            if ($box.lastElementChild.tagName === "IMG") return; // Img already there
            const image = shipRender.renderImage(ship.length);
            image.classList.add("placed-ship");
            if (ship.horizontal) image.classList.add("horizontal");
            $box.appendChild(image);
        })
    };

    function clearShips() {
        $boxes.forEach(box => {
            const lastChild = box.lastElementChild;
            if (lastChild.tagName === "IMG") lastChild.remove();
        })
    }

    function coordToIndex(x, y) {
        return size * x + y;
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

    return { getContainer, updateGrid, activateListeners, clearShips }
}