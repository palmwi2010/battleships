import ShipRender from "./ship-render";

export default function Gallery(controller) {

    const gallery = document.createElement("div");
    gallery.className = "gallery";
    const shipRender = ShipRender();

    let isDragging = false;
    let image, imageWidth, imageHeight, isHorizontal;

    function render() {

        while (gallery.firstChild) {
            gallery.firstChild.remove();
        }

        const player = controller.game.getActivePlayer();
        const ships = player.board.dockedShips;

        ships.forEach(ship => {
            gallery.appendChild(renderNewShip(ship.length));
        })
    }

    function renderNewShip(holes) {
        const div = document.createElement("div");
        div.className = "ship-container";
        const img = shipRender.renderImage(holes);

        img.addEventListener("mousedown", dragBoat);
        img.addEventListener("mouseup", toggleHorizontal);
        div.appendChild(img);
        return div;
    }

    function getContainer() {
        return gallery;
    }

    function dragBoat(e) {
            // Set dragging and target image
            isDragging = true;
            image = e.currentTarget;
            isHorizontal = image.classList.contains("horizontal");
            console.log(isHorizontal)

            // Get image
            const styles = window.getComputedStyle(image);
            imageWidth = parseFloat(styles.getPropertyValue("width"));
            imageHeight = parseFloat(styles.getPropertyValue("height"));
    
            // Add mousemove and mouseup event listeners to the document
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
    }

    function toggleHorizontal(e) {
        e.currentTarget.classList.toggle("horizontal");
    }

    function onMouseMove(e) {
        if (!isDragging) return;

        // Calculate the new position of the image
        const left = e.clientX - ((isHorizontal) ? -(imageHeight/3):(imageWidth/2));
        const top = e.clientY - ((isHorizontal) ? (imageHeight/2):0);
        console.log(top);

        // Update the image's position
        image.style.position = "absolute";
        image.style.left = `${left}px`;
        image.style.top = `${top}px`;

        // Add the coloring of squares
        image.removeEventListener("mouseup", toggleHorizontal);
        openShipDeploy();
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
            board.insertShip(Number(box.dataset.x), Number(box.dataset.y), length, isHorizontal);
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
        image.addEventListener("mouseup", toggleHorizontal)

        // Remove all temporary styling and listeners
        document.querySelectorAll(".box-free").forEach(element => {
            element.classList.remove("box-free");
        });
    }

    function openShipDeploy() {
        // Main logic
        const {ship} = image.dataset;
        const {board} = controller.game.getActivePlayer();
        const $boxes = document.querySelectorAll(".box");
        const {possibleMoves} = board;

        for (let i = 0; i < possibleMoves.length; i++) {
            const move = possibleMoves[i];
            const $box = $boxes[i]
            if (board.isSpaceAvailable(move[0], move[1], ship, isHorizontal)) {
                $box.classList.add("box-free");
            }
        }
    }

    function updateGallery() {
        console.log("updating gallery")
    }

    return { render, getContainer, updateGallery }
}