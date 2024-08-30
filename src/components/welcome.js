import PopupDialog from "./popup-dialog.js";

export default function Welcome(controller) {

    const container = document.createElement("div");

    function render() {
        container.className = "welcome-container";

        const popup = PopupDialog(controller);
        container.appendChild(popup.renderLaunchScreen());

        const buttons = container.querySelectorAll("button");
        buttons.forEach(button => {
            button.addEventListener("click", clearWelcome);
        })

        return container;
    }

    function clearWelcome() {
        container.classList.add("welcome-exit");
        setTimeout(() => {
            container.remove();
        }, 1000);
    }

    return { render }
}