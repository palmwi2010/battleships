import Player from "./player";

export default function Gallery() {

    function render() {
        const gallery = document.createElement("div");
        gallery.className = "gallery";

        const topGallery = document.createElement("div");
        topGallery.className = "top-gallery";

        const bottomGallery = document.createElement("div");
        bottomGallery.className = "bottom-gallery";

        const ships = Player.startingShips;

        for (let index = 0; index < ships.length; index++) {
            const ship = ships[index];
            const $shipTop = renderShip(ship, "horizontal");
            const $shipBottom = renderShip(ship, "vertical");
            topGallery.appendChild($shipTop);
            bottomGallery.appendChild($shipBottom);
        }
        gallery.appendChild(topGallery);
        gallery.appendChild(bottomGallery);
        return gallery;
    }

    function renderShip(holes, orientation) {
        const container = document.createElement("div");
        container.className = "ship";
        container.classList.add(orientation);
        container.setAttribute("data-ship", holes);

        if (orientation === "vertical") {
            container.classList.add("ship-empty");
        }
    
        for (let i = 0; i < holes; i++) {
            const hole = document.createElement("div");
            hole.className = "inner-box";
            container.appendChild(hole);
        }
        return container;
    }

    return { render }
}