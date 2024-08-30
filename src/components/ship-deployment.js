class ShipDeployment {

    constructor(game, refreshBoard) {
        this.game = game;

        // For ship selection
        this.selectedShip = null;
        this.refreshBoard = refreshBoard;
    }

    openShipDeploy = (e) => {
        // Mute drag selections
        document.body.style.userSelect = 'none';

        // Main logic
        const {ship} = e.currentTarget.dataset;
        const {board} = this.game.getActivePlayer();
        const $boxes = document.querySelectorAll(".box");
        const {possibleMoves} = board;

        for (let i = 0; i < possibleMoves.length; i++) {
            const move = possibleMoves[i];
            const $box = $boxes[i]
            if (board.isSpaceAvailable(move[0], move[1], ship, "horizontal")) {
                $box.classList.add("box-free");
            }
        }
        // Listen for the mouseup
        this.selectedShip = ship;
        document.addEventListener('mouseup', this.closeShipDeploy);
    }

    closeShipDeploy = (e) => {

        // Get the div it occurred in
        let clickedElement = e.target;
        
        // Move to the box div if in an inner box
        if (clickedElement.classList.contains('inner-box')) {
            clickedElement = clickedElement.parentElement;
        }

        // Check if it was a valid entry
        if (clickedElement.classList.contains("box")) {
            console.log("here")
            const {x} = clickedElement.dataset;
            const {y} = clickedElement.dataset;
            if (this.game.getActivePlayer().board.insertShip(Number(x), Number(y), this.selectedShip)) {
                this.refreshBoard();
            };
        }

        // Remove all temporary styling and listeners
        document.querySelectorAll(".box-free").forEach(element => {
            element.classList.remove("box-free");
        });
        document.body.style.userSelect = '';
        document.removeEventListener('mouseup', this.closeShipDeploy);
        this.selectedShip = null;
    }
}

export default ShipDeployment;