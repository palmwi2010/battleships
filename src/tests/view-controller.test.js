import ViewController from "../components/view-controller";
import Game from "../components/game";

describe("sendAttack", () => {

    let viewcontroller;
    let mockShotFired;
    let mockRefreshBoard;
    let mockEvent;

    beforeEach(() => {
        viewcontroller = new ViewController();
        viewcontroller.game = new Game();

        // Mock the methods in the instance
        mockShotFired = jest.spyOn(viewcontroller.game, "shotFired").mockReturnValue(true);
        mockRefreshBoard = jest.spyOn(viewcontroller, "refreshBoard").mockImplementation(jest.fn());

        // Create a mock event
        mockEvent = {
            currentTarget: {
                dataset: {
                    x: 2,
                    y: 3
                }
            }
        }
    })

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("shot fired is given the correct inputs", () => {
        viewcontroller.sendAttack(mockEvent);

        expect(mockShotFired).toHaveBeenCalledWith(2, 3);
    })

    test("shot fired leads to board refresh", () => {
        viewcontroller.sendAttack(mockEvent);

        expect(mockRefreshBoard).toHaveBeenCalled();
    })

})