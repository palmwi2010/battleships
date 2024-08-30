import battleshipsHeader from "../assets/battleshipsHeader.webp";
import Player from "./player";

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
    body.appendChild(renderGallery());
    body.appendChild(renderHeader());
    body.appendChild(renderButtons());
    body.appendChild(container);
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

function renderHeader() {
    const banner = document.createElement("div");
    banner.className = "top-banner";

    const header = document.createElement("img");
    header.className = "battleships-header";
    header.src = battleshipsHeader;

    banner.appendChild(header);
    return banner;
}

function renderGallery() {
    const gallery = document.createElement("div");
    gallery.className = "gallery";
    gallery.textContent = "Naval base";

    const ships = Player.startingShips;

    for (let index = 0; index < ships.length; index++) {
        const ship = ships[index];
        const $ship = renderShip(ship);
        gallery.appendChild($ship);
    }
    return gallery;
}

function renderShip(holes) {
    const container = document.createElement("div");
    container.className = "ship";
    container.setAttribute("data-ship", holes);

    for (let i = 0; i < holes; i++) {
        const hole = document.createElement('div');
        hole.className = "inner-box";
        container.appendChild(hole);
    }
    return container;
}

function renderButtons() {
    const container = document.createElement("div");
    container.className = "button-container";

    const startButton = document.createElement("button")
    startButton.textContent = "Start game";
    startButton.className = "start-btn";

    container.appendChild(startButton);

    return container;
}