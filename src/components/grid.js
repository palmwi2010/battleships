export default function Grid(size) {

    const container = document.createElement("div");
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

    return { render, getContainer }
}