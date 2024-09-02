export default function GameControls(controller) {

    const container = document.createElement("div");
    container.className = "button-container";
    const startButton = document.createElement("button");
    startButton.className = "start-btn";
    container.appendChild(startButton);

    const startTxt = "Start game";
    const restartTxt = "Restart game";

    function render() {
        if (controller.deploymentPhase) {
            renderStartButton();
        } else {
            renderRestartButton();
        }
        return container;
    }

    function isStartButton() {
        return startButton.textContent === startTxt;
    }

    function renderRestartButton() {
        startButton.textContent = restartTxt;
        startButton.classList.add("active-btn");
        startButton.removeEventListener('click', startGame);
        startButton.addEventListener('click', restartGame);
    }

    function renderStartButton() {
        startButton.textContent = startTxt;
        startButton.classList.remove("active-btn");
        startButton.removeEventListener('click', restartGame);
    }

    function activateButton() {
        startButton.classList.add("active-btn");
        if (isStartButton()) {
            startButton.addEventListener('click', startGame);
        } else {
            throw Error("Restart button shouldn't need to be activated.");
        }
    }

    function deactivateButton() {
        startButton.classList.add("active-btn");
        startButton.removeEventListener('click', startGame);
    }

    function startGame() {
        controller.initGame();
    }

    function restartGame() {
        controller.initDeployment();
    }

    return { render, activateButton, deactivateButton };
}