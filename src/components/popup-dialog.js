export default function PopupDialog(controller) {

    function renderLaunchScreen() {
        const buttonContainer = document.createElement("div");
        buttonContainer.className = "welcome-btn-container";
    
        const header = document.createElement("h1");
        header.className = "welcome-header";
        header.innerText = "Click to start!"

        buttonContainer.appendChild(header);
        const buttonItems = renderButtons();
        buttonContainer.appendChild(buttonItems);

        return buttonContainer;
    }

    function renderButtons() {
        const buttonItems = document.createElement("div");
        buttonItems.className = "welcome-btn-row";
    
        const vsComputerButton = document.createElement("button");
        vsComputerButton.className = "welcome-btn";
        vsComputerButton.innerText = "Play vs Computer";
    
        const vsHumanButton = document.createElement("button");
        vsHumanButton.className = "welcome-btn";
        vsHumanButton.innerText = "Play vs Human";
    
        vsComputerButton.addEventListener("click", startVsComputer);
        vsHumanButton.addEventListener("click", startVsHuman);
    
        buttonItems.appendChild(vsComputerButton);
        buttonItems.appendChild(vsHumanButton);
        return buttonItems;
    }

    function startVsComputer() {
        controller.initDeployment();
    }

    function startVsHuman() {
        controller.initDeployment();
    }

    return { renderLaunchScreen }
}