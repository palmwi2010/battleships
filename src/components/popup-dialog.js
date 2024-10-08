import Game from "./game";
import checkImg from "../assets/check.svg";

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

    function renderInfo() {
        const $dialog = document.createElement("dialog");
        $dialog.className = "info-dialog";
 
        const subHeaderTitle = document.createElement("p");
        const subHeaderInfo = document.createElement("p");
        const confirmButton = document.createElement("img")
        confirmButton.src = checkImg;
        confirmButton.alt = "Confirm button";
        confirmButton.className = "confirm-btn";
        confirmButton.addEventListener("click", () => $dialog.remove());

        subHeaderTitle.className = "subheader-title";
        subHeaderInfo.className = "subheader-info";

        subHeaderTitle.textContent = "Deployment";
        subHeaderInfo.textContent = "Drag and drop your ships, and click to turn";

        $dialog.appendChild(subHeaderTitle);
        $dialog.appendChild(subHeaderInfo);
        $dialog.appendChild(confirmButton);

        document.body.appendChild($dialog);
        $dialog.showModal();
        $dialog.id = "active-info";

        return $dialog;
    }

    function renderGameOver(gameResult = 0) {
        const $body = document.querySelector("body");
        const $dialog = document.createElement("dialog");
        $dialog.className = "game-dialog";
    
        const $header = document.createElement("h3");
        $header.className = "dialog-header";
        $header.textContent = generateHeader(gameResult);
    
        const $subheader = document.createElement("h5");
        $subheader.className = "dialog-subheader";
        $subheader.textContent = "Play again?";

        const $buttonItems = renderButtons();

        $buttonItems.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => $dialog.remove());
        })

        $dialog.appendChild($header);
        $dialog.appendChild($subheader);
        $dialog.appendChild($buttonItems);

        $body.appendChild($dialog);

        return $dialog;
    }

    function generateHeader(gameResult) {

        const {resultMap} = Game;

        switch (gameResult) {
            case resultMap.GAME_ENDED:
                return "Game ended!";
            case resultMap.P1_WINS:
                return "Player 1 wins!";
            case resultMap.P2_WINS:
                return "Player 2 wins!";
            case resultMap.COMPUTER_WINS:
                return "Computer wins!"
        }
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
        //buttonItems.appendChild(vsHumanButton);
        return buttonItems;
    }

    function startVsComputer() {
        controller.initDeployment();
    }

    function startVsHuman() {
        controller.initDeployment();
    }

    return { renderLaunchScreen, renderGameOver, renderInfo }
}