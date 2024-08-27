import Game from "../components/game";

// Dev tests - to be removed
test("auto-coordinates", () => {
    const game = new Game();
    expect(game.player1.board.ships.length).toBe(4);
    expect(game.player2.board.ships.length).toBe(4);
})

test("initial attack recorded", () => {
    const game = new Game();
    game.shotFired(0,0);
    expect(game.turn.toBe(2));
})