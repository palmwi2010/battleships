export default function render(isGameover, winner = null) {

    const $dialog = document.createElement("div");
    $dialog.className = "game-dialog";

    const $header = document.createElement("h3");
    $header.className = "dialog-header";
    $header.textContent = "Game over!";

    const $subheader = document.createElement("h5");
    $subheader.className = "dialog-subheader";
    $subheader.textContent = "Play again?";

    

}