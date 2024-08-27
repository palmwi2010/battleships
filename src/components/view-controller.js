import Player from "./player";
import welcome from "./welcome";

class ViewController {

    constructor() {
        welcome(this);
    }

    initGame(isVsComputer) {
        if (isVsComputer) {
            console.log("Let's play against the computer!")
        } else {
            console.log("Let's play against the human.")
        }
    }

}

export default ViewController;