import Ship from "../components/ship";

test("hit", () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.numHits).toBe(1);
    ship.hit();
    expect(ship.numHits).toBe(2);
})

test("sink", () => {
    const ship = new Ship(3);
    expect(ship.sunk).toBe(false);
    ship.hit();
    expect(ship.sunk).toBe(false);
    ship.hit();
    expect(ship.sunk).toBe(false);
    ship.hit();
    expect(ship.sunk).toBe(true);
    ship.hit();
    expect(ship.sunk).toBe(true);
})

test("extra hits no effect", () => {
    const ship = new Ship(3);
    for (let i = 0; i < 10; i++) {
        ship.hit()
    }
    expect(ship.numHits).toBe(3);
})

test("ship no length", () => {
    expect(() => new Ship()).toThrow();
})