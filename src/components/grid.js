import Game from "./game";

export default function Grid(controller) {

    const container = document.createElement("div");
    const size = Game.boardSize;
    render();

    function render() {
        container.className = "grid-container";

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
                box.classList.add("box-empty");
                box.setAttribute("data-x", i);
                box.setAttribute("data-y", j);
                const innerBox = document.createElement("div");
                innerBox.className = "inner-box";
                box.appendChild(innerBox);
                row.appendChild(box);
            }
            container.appendChild(row);
        }
        container.appendChild(rowColCoordinates);
    }

    function getContainer() {
        return container;
    }

    function updateGrid(player, isOwnBoard) {
        const $boxes = container.querySelectorAll(".box");
        let boxIndex = 0;
    
        for (let i = 0; i < controller.game.boardsize; i++) {
            const row = player.board.board[i];
            for (let j = 0; j < controller.game.boardsize; j++) {
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

    return { getContainer, updateGrid }
}