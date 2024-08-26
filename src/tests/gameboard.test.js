import Gameboard from "../components/gameboard";

test("new gameboard dimensions", () => {
    expect(new Gameboard(5).board.length).toBe(5);
    expect(new Gameboard(5).board[0].length).toBe(5);
}) 

test("new gameboard all empty", () => {
    expect(new Gameboard(5).board[2][2]).toBe(0);
})
