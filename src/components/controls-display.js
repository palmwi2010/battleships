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

    renderGameOver() {
        const $body = document.querySelector('body');
        const $dialog = document.createElement("dialog");
        $dialog.className = "game-dialog";
    
        const $header = document.createElement("h3");
        $header.className = "dialog-header";
        $header.textContent = "Game over!";
    
        const $subheader = document.createElement("h5");
        $subheader.className = "dialog-subheader";
        $subheader.textContent = "Play again?";

        const $buttonItems = this.#renderButtons();

        $dialog.appendChild($header);
        $dialog.appendChild($subheader);
        $dialog.appendChild($buttonItems);

        $body.appendChild($dialog);

        return $dialog;
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
        console.log(this.viewController);
        this.viewController.initGame(true);
        this.#clearWelcome();
    }

    #startVsHuman() {
        this.viewController.initGame(false);
        this.#clearWelcome();
    }

    #clearWelcome() {
        if (this.container.classList.contains("welcome-container")) {
            this.container.classList.add("welcome-exit");
            // Wait for the transition to complete before removing the element
            setTimeout(() => {
                this.container.remove();
            }, 1000);
        }
    }
}

export default ControlsDisplay;