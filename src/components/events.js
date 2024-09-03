import Game from "./game";

export default function Events(controller)  {

    // Send attack when clicking on a square
    function sendAttack(e) {
        if (controller.deploymentPhase) return;

        const box = e.currentTarget;
        const {x} = box.dataset;
        const {y} = box.dataset;
        const result = controller.game.shotFired(Number(x),Number(y));
        
        if (result) controller.refresh();
    }

    return { sendAttack }
}