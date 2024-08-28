import Game from "../components/game";

// Dev tests - to be removed
test("auto-coordinates", () => {
    const game = new Game();
    expect(game.player1.board.ships.length).toBe(4);
    expect(game.player2.board.ships.length).toBe(4);
})

test("initial attack recorded", () => {
    const game = new Game();
    expect(game.shotFired(0,0)).toBe(true);
    expect(game.turn).toBe(2);
})

test("random attacks successfully created", () => {
    const game = new Game();
    game.shotFired(0, 0);
    expect(game.generateComputerMove().length).toBe(2);
})