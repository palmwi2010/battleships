export default function GameControls(controller) {
    let startButton = null;
    const startTxt = "Start game";
    const restartTxt = "Restart game";

    function render() {
        const container = document.createElement("div");
        container.className = "button-container";
    
        startButton = document.createElement("button")
        startButton.textContent = startTxt;
        startButton.className = "start-btn";

        activateButton();
    
        container.appendChild(startButton);
        return container;
    }

    function isStartButton() {
        return startButton.textContent === startTxt;
    }

    function activateButton() {
        startButton.classList.add("active-btn");
        if (isStartButton()) {
            startButton.addEventListener('click', startGame);
        } else {
            throw Error("Restart button shouldn't need to be activated.");
        }
    }

    function startGame() {
        controller.initGame();
        toggleButton();
    }

    function restartGame() {
        // TODO Call controller to restart the game
        toggleButton();
    }

    function resetButton() {
        startButton.removeEventListener('click', restartGame);
        startButton.textContent = startTxt;
        startButton.className = "start-btn";
        activateButton();
    }

    function toggleButton() {
        if (isStartButton()) {
            startButton.removeEventListener('click', startGame);
            startButton.addEventListener('click', restartGame);
            startButton.textContent = restartTxt;
        } else {
            startButton.removeEventListener('click', restartGame);
            startButton.textContent = startTxt;
            startButton.className = "start-btn";
            activateButton();
        }
    }

    return {render, toggleButton, activateButton, resetButton};
}