export default function welcome(viewController) {
    const body = document.querySelector("body");
    
    const container = document.createElement("div");
    container.className = "welcome-container";

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "welcome-btn-container";

    const header = document.createElement("h1");
    header.className = "welcome-header";
    header.innerText = "Click to start!"

    const buttonItems = document.createElement("div");
    buttonItems.className = "welcome-btn-row";

    const vsComputerButton = document.createElement("button");
    vsComputerButton.className = "welcome-btn";
    vsComputerButton.innerText = "Play vs Computer";

    const vsHumanButton = document.createElement("button");
    vsHumanButton.className = "welcome-btn";
    vsHumanButton.innerText = "Play vs Human";

    vsComputerButton.addEventListener("click", () => startVsComputer(container, viewController));
    vsHumanButton.addEventListener("click", () => startVsHuman(container, viewController));

    buttonContainer.appendChild(header);
    buttonItems.appendChild(vsComputerButton);
    buttonItems.appendChild(vsHumanButton);
    buttonContainer.appendChild(buttonItems);
    container.appendChild(buttonContainer);
    body.appendChild(container);
}

function startVsComputer(container, viewController) {
    viewController.initGame(true);
    clearWelcome(container);
}

function startVsHuman(container, viewController) {
    viewController.initGame(false);
    clearWelcome(container);
}

function clearWelcome(container) {
    container.classList.add("welcome-exit");
        // Wait for the transition to complete before removing the element
        setTimeout(() => {
            container.remove();
        }, 1000);
}