import Game from "./game";

export default function Events(controller)  {

    // Send attack when clicking on a square
    function sendAttack(e) {
        if (controller.deploymentPhase) return;

        const box = e.currentTarget;
        const {x} = box.dataset;
        const {y} = box.dataset;
        //console.log(controller.game);
        const result = controller.game.shotFired(Number(x),Number(y));

        if (result === Game.ShotResult.SHOT_SENT) {
            controller.main.refreshBoard();
        } else if (result === Game.ShotResult.GAME_OVER) {
            // Handle end game display
            if (controller.game.turn === 1) {
                controller.showGameOver(Game.resultMap.P1_WINS)
            } else {
                if (controller.game.player2.isComputer) {
                    controller.showGameOver(Game.resultMap.COMPUTER_WINS);
                } else {
                    controller.showGameOver(Game.resultMap.P2_WINS);
                }
            }
        }
    }

    return { sendAttack }
}