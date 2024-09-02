import Player from "./player";
import destroyerImg from "../assets/destroyer.webp";
import frigateImg from "../assets/frigate.webp";
import galleyA from "../assets/galley-a.webp";
import galleyB from "../assets/galley-b.webp";
import fisherImg from "../assets/fisher.webp";

export default function Gallery(controller) {

    const gallery = document.createElement("div");
    gallery.className = "gallery";

    // Mapping of image based on number of holes in ship
    const shipMap = {
        2: {img:fisherImg, class: "fisher-gallery", holes: 2},
        3: {img:galleyA, class: "galley-gallery", holes:3},
        4: {img:frigateImg, class: "frigate-gallery", holes: 4},
        5: {img:destroyerImg, class: "destroyer-gallery", holes:5},
    }

    let isDragging = false;
    let image, imageWidth;

    function render() {

        while (gallery.firstChild) {
            gallery.firstChild.remove();
        }

        const player = controller.game.getActivePlayer();
        const ships = player.board.dockedShips;

        ships.forEach(ship => {
            const shipView = shipMap[ship.length];
            gallery.appendChild(renderNewShip(shipView));
        })
    }

    function renderNewShip(obj) {
        const img = document.createElement("img");
        img.src = obj.img;
        img.alt = `Image of a ship with ${obj.holes} holes.`
        img.setAttribute("data-ship", obj.holes);
        img.className = "boat-gallery";
        img.classList.add(obj.class);
        img.addEventListener("mousedown", dragBoat);
        return img;
    }

    function getContainer() {
        return gallery;
    }

    function dragBoat(e) {
            // Set dragging and target image
            isDragging = true;
            image = e.currentTarget;

            // Get image
            const styles = window.getComputedStyle(image);
            imageWidth = parseFloat(styles.getPropertyValue("width"));

            // Set position to absolute at the start of dragging
            image.style.position = "absolute";
    
            // Calculate the offset between the mouse click position and the image's top-left corner
            const left = e.clientX - imageWidth/2;
    
            // Set the image's initial position to its current position
            image.style.left = `${left}px`;
            image.style.top = `${e.clientY}px`;
    
            // Add mousemove and mouseup event listeners to the document
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);

            // Add the coloring of squares
            openShipDeploy(e);
    }

    function onMouseMove(e) {
        if (!isDragging) return;

        // Calculate the new position of the image
        const left = e.clientX - imageWidth/2;

        // Update the image's position
        image.style.left = `${left}px`;
        image.style.top = `${e.clientY}px`;
    }

    function onMouseUp(e) {
        // Remove dragging effect
        isDragging = false;

        const x = e.clientX;
        const y = e.clientY;
    
        // Find the element at the mouse coordinates
        image.style.position = "static";
        const box = document.elementFromPoint(x, y).closest(".box");

        if (box) {
            const {board} = controller.game.getActivePlayer();
            const length = Number(image.dataset.ship);
            board.insertShip(Number(box.dataset.x), Number(box.dataset.y), length, false);
            if (board.deployShip(length)) {
                controller.setReady();
            }
            controller.main.refreshBoard()
        } else {
            image.style.position = "static";
        }

        // Remove the event listeners when the mouse is released
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);

        // Remove all temporary styling and listeners
        document.querySelectorAll(".box-free").forEach(element => {
            element.classList.remove("box-free");
        });
    }

    function openShipDeploy(e) {
        // Main logic
        const {ship} = e.currentTarget.dataset;
        const {board} = controller.game.getActivePlayer();
        const $boxes = document.querySelectorAll(".box");
        const {possibleMoves} = board;

        for (let i = 0; i < possibleMoves.length; i++) {
            const move = possibleMoves[i];
            const $box = $boxes[i]
            if (board.isSpaceAvailable(move[0], move[1], ship, false)) {
                $box.classList.add("box-free");
            }
        }
    }

    function updateGallery() {
        console.log("updating gallery")
    }

    return { render, getContainer, updateGallery }
}