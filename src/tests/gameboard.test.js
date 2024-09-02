import Gameboard from "../components/gameboard";
import Ship from "../components/ship";

test("new gameboard dimensions", () => {
    expect(new Gameboard(5).board.length).toBe(5);
    expect(new Gameboard(5).board[0].length).toBe(5);
}) 

test("new gameboard all empty", () => {
    expect(new Gameboard(5).board[2][2]).toBe(0);
})

test("insert ship base", () => {
    const board = new Gameboard(5);
    board.insertShip(1,1,2);
    expect(board.board[1][1]).toBeInstanceOf(Ship);
    expect(board.ships[0]).toBeInstanceOf(Ship);
    expect(board.board[1][1] === board.ships[0]).toBe(true);
})

test("insert ship all squares", () => {
    const board = new Gameboard(5);
    expect(board.insertShip(1,1,3)).toBe(true);
    expect(board.board[1][1]).toBeInstanceOf(Ship);
    expect(board.board[1][1] === board.ships[0]).toBe(true);
    expect(board.board[1][1] === board.board[1][2]).toBe(true);
    expect(board.board[1][1] === board.board[1][3]).toBe(true);
})

test("insert ship vertical", () => {
    const board = new Gameboard(5);
    expect(board.insertShip(1,1,2,false)).toBe(true);
    expect(board.board[1][1]).toBeInstanceOf(Ship);
    expect(board.board[2][1]).toBeInstanceOf(Ship);
})

test("insert ship out of bounds", () => {
    const board = new Gameboard(5);
    expect(board.insertShip(3,3,4)).toBe(false);
    expect(board.ships.length).toBe(0);
})

test("insert ship on edge", () => {
    const board = new Gameboard(5);
    expect(board.insertShip(3,3,2)).toBe(true);
})

test("reject if ship already present", () => {
    const board = new Gameboard(5);
    board.insertShip(2,2,3)
    expect(board.insertShip(2,3,3,false)).toBe(false);
})

test("hitting a ship", () => {
    const board = new Gameboard(5);
    board.insertShip(1,1,3);
    board.receiveAttack(1,2);
    expect(board.ships[0].numHits).toBe(1);
})

test("sinking a ship", () => {
    const board = new Gameboard(5);
    board.insertShip(1,1,3);
    board.receiveAttack(1,2);
    board.receiveAttack(1,1);
    board.receiveAttack(1,3);
    expect(board.ships[0].isSunk()).toBe(true);
})

test("hitting same square doesn't sink", () => {
    const board = new Gameboard(5);
    board.insertShip(1,1,3);
    board.receiveAttack(1,2);
    board.receiveAttack(1,2);
    board.receiveAttack(1,2);
    expect(board.ships[0].numHits).toBe(1);
    expect(board.ships[0].isSunk()).toBe(false);
})

test("ships all sunks", () => {
    const board = new Gameboard(5);
    board.insertShip(1,1,3);
    expect(board.checkAllSunk()).toBe(false);
    board.receiveAttack(1,2);
    board.receiveAttack(1,1);
    expect(board.checkAllSunk()).toBe(false);
    board.receiveAttack(1,3);
    expect(board.checkAllSunk()).toBe(true);
})

test("hits and misses recording", () => {
    const board = new Gameboard(5);
    board.insertShip(1,1,3);
    board.receiveAttack(1,2);
    board.receiveAttack(4,4);
    expect(board.hits[0][0]).toBe(1);
    expect(board.hits[0][1]).toBe(2);
    expect(board.misses[0][0]).toBe(4);
    expect(board.misses[0][1]).toBe(4);
})

test("creation of possible moves", () => {
    const board = new Gameboard(5);
    expect(board.possibleMoves.length).toBe(25);
    expect(board.possibleMoves[0][0]).toBe(0);
    expect(board.possibleMoves[0][1]).toBe(0);
})

test("updating of possible moves", () => {
    const board = new Gameboard(5);
    board.removePossibleMove(0, 0);
    expect(board.possibleMoves.length).toBe(24);
    expect(board.possibleMoves[0][0]).toBe(0);
    expect(board.possibleMoves[0][1]).toBe(1);
})

