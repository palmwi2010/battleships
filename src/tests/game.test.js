import Game from "../components/game";

// Dev tests - to be removed
test("auto-coordinates", () => {
    const game = new Game();
    expect(game.player1.board.ships.length).toBe(0);
    expect(game.player2.board.ships.length).toBe(5);
})

test("initial attack recorded", () => {
    const game = new Game();
    game.player1.board.insertShip(0, 0, 3, true);
    expect(game.shotFired(0,0)).toBe(1);
    expect(game.turn).toBe(1);
})

test("random attacks successfully created", () => {
    const game = new Game();
    game.player1.board.insertShip(0, 0, 3, true);
    game.shotFired(0, 0);
    expect(game.generateComputerMove().length).toBe(2);
})