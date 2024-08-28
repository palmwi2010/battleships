export default function render(boardSize) {
    const body = document.querySelector("body");
    
    const playerSide = document.createElement("div");
    playerSide.className = "main-section";
    const playerHeader = document.createElement("h2");
    playerHeader.className = "player-name"
    playerHeader.textContent = "Player";
    playerSide.appendChild(playerHeader);
    
    const opponentSide = document.createElement("div");
    opponentSide.className = "main-section";
    const opponentHeader = document.createElement("h2");
    opponentHeader.className = "player-name"
    opponentHeader.textContent = "Opponent";
    opponentSide.appendChild(opponentHeader);

    const playerGrid = grid(boardSize);
    const opponentGrid = grid(boardSize);

    const container = document.createElement("div");
    container.className = "game-container";

    playerGrid.id = "player-grid";
    opponentGrid.id = "opponent-grid";

    playerSide.appendChild(playerGrid);
    opponentSide.appendChild(opponentGrid);

    container.appendChild(playerSide);
    container.appendChild(opponentSide);
    body.appendChild(container);
}

function updatePlayerBoard(playerBoard) {
    const $playerBoard = document.querySelector("#player-grid");
    const $boxes = $playerBoard.querySelectorAll(".box");
    let boxIndex = 0;

    for (let i = 0; i < this.game.boardsize; i++) {
        const row = activePlayer.board.board[i];
        for (let j = 0; j < this.game.boardsize; j++) {
            const square = row[j];
            const $box = $boxes[boxIndex];
            $box.className = "box";
            if (square === 0) {
                $box.classList.add("box-empty");
            } else {
                $box.classList.add("box-ship");
            }
            boxIndex++;
        }
    }

}

function grid(size) {
    
    const container = document.createElement("div");
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
            const innerBox = document.createElement("div");
            innerBox.className = "inner-box";
            box.appendChild(innerBox);
            row.appendChild(box);
        }
        container.appendChild(row);
    }
    container.appendChild(rowColCoordinates);
    return container;
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

function navalBase() {
    const container = document.createElement("div");
    container.className = "naval-base";
}

function renderShip(size) {
    const container = document.createElement("div");
    container.className = "ship";

    for (let i = 0; i < size; i++) {
        const box = document.createElement("div");
        box.className = "ship-box";
        container.appendChild("")
    }
}