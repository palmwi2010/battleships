import Game from "./game";

export default function Events(controller)  {

    const {game} = controller;
    let selectedShip = null;

    function openShipDeploy(e) {
        // Mute drag selections
        document.body.style.userSelect = "none";

        // Main logic
        const {ship} = e.currentTarget.dataset;
        const {board} = game.getActivePlayer();
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
        selectedShip = ship;
        document.addEventListener("mouseup", closeShipDeploy);
    }

    function closeShipDeploy(e) {

        // Get the div it occurred in
        let clickedElement = e.target;
        
        // Move to the box div if in an inner box
        if (clickedElement.classList.contains("inner-box")) {
            clickedElement = clickedElement.parentElement;
        }

        // Check if it was a valid entry
        if (clickedElement.classList.contains("box")) {
            const {x} = clickedElement.dataset;
            const {y} = clickedElement.dataset;
            if (game.getActivePlayer().board.insertShip(Number(x), Number(y), selectedShip)) {
                controller.main.refreshBoard();
            };
        }

        // Remove all temporary styling and listeners
        document.querySelectorAll(".box-free").forEach(element => {
            element.classList.remove("box-free");
        });
        document.body.style.userSelect = "";
        document.removeEventListener("mouseup", this.closeShipDeploy);
        selectedShip = null;
    }

    // Send attack when clicking on a square
    function sendAttack(e) {
        if (controller.deploymentPhase) return;
        
        const box = e.currentTarget;
        const {x} = box.dataset;
        const {y} = box.dataset;
        console.log(game);
        const result = game.shotFired(Number(x),Number(y));

        if (result === Game.ShotResult.SHOT_SENT) {
            controller.main.refreshBoard();
        } else if (result === Game.ShotResult.GAME_OVER) {
            // Handle end game display
            if (game.turn === 1) {
                controller.showGameOver(Game.resultMap.P1_WINS)
            } else {
                if (game.player2.isComputer) {
                    controller.showGameOver(Game.resultMap.COMPUTER_WINS);
                } else {
                    controller.showGameOver(Game.resultMap.P2_WINS);
                }
            }
        }
    }

    return { sendAttack, openShipDeploy }
}