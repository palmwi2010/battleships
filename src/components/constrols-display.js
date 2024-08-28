class ControlsDisplay {

    constructor(viewController) {
        this.viewController = viewController;
        this.container = document.createElement("div");
    }

    renderLaunchScreen() {
        const body = document.querySelector("body");
    
        this.container.className = "welcome-container";
    
        const buttonContainer = document.createElement("div");
        buttonContainer.className = "welcome-btn-container";
    
        const header = document.createElement("h1");
        header.className = "welcome-header";
        header.innerText = "Click to start!"

        buttonContainer.appendChild(header);
        const buttonItems = this.#renderButtons();
        buttonContainer.appendChild(buttonItems);
        this.container.appendChild(buttonContainer);

        body.appendChild(this.container);
    }

    #renderButtons() {
        const buttonItems = document.createElement("div");
        buttonItems.className = "welcome-btn-row";
    
        const vsComputerButton = document.createElement("button");
        vsComputerButton.className = "welcome-btn";
        vsComputerButton.innerText = "Play vs Computer";
    
        const vsHumanButton = document.createElement("button");
        vsHumanButton.className = "welcome-btn";
        vsHumanButton.innerText = "Play vs Human";
    
        vsComputerButton.addEventListener("click", () => this.#startVsComputer());
        vsHumanButton.addEventListener("click", () => this.#startVsHuman());
    
        buttonItems.appendChild(vsComputerButton);
        buttonItems.appendChild(vsHumanButton);
        return buttonItems;
    }

    #startVsComputer() {
        this.viewController.initGame(true);
        this.#clearWelcome();
    }

    #startVsHuman() {
        this.viewController.initGame(false);
        this.#clearWelcome();
    }

    #clearWelcome() {
        this.container.classList.add("welcome-exit");
            // Wait for the transition to complete before removing the element
            setTimeout(() => {
                this.container.remove();
            }, 1000);
    }
}

export default ControlsDisplay;