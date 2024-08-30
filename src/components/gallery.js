import Player from "./player";

export default function Gallery() {

    function render() {
        const gallery = document.createElement("div");
        gallery.className = "gallery";

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
            const hole = document.createElement("div");
            hole.className = "inner-box";
            container.appendChild(hole);
        }
        return container;
    }

    return { render }
}