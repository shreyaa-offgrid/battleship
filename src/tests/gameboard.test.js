import { Gameboard } from "../logic/gameboard.js";
import { Ship } from "../logic/ship.js";

describe("Gameboard", () => {

    it("creates a 10x10 primary grid", () => {
        const board = new Gameboard();

        expect(board.primaryGrid.length).toBe(10);
        board.primaryGrid.forEach(row => {
            expect(row.length).toBe(10);
        });
    });

    it("creates a 10x10 tracking grid", () => {
        const board = new Gameboard();

        expect(board.trackingGrid.length).toBe(10);
        board.trackingGrid.forEach(row => {
            expect(row.length).toBe(10);
        });
    });

    it("reports when all ships have been sunk", () => {
        const board = new Gameboard();
        const ship1 = new Ship(1);
        const ship2 = new Ship(2);

        board.placeShip(ship1, 0, 0, "horizontal");
        board.placeShip(ship2, 2, 2, "vertical");

        board.receiveAttack(0, 0);
        board.receiveAttack(2, 2);
        board.receiveAttack(3, 2);

        expect(board.allShipsSunk()).toBe(true);
    });

    it("does not report game over if at least one ship is still afloat", () => {
        const board = new Gameboard();
        const ship1 = new Ship(1);
        const ship2 = new Ship(2);

        board.placeShip(ship1, 0, 0, "horizontal");
        board.placeShip(ship2, 2, 2, "vertical");

        board.receiveAttack(0, 0);
        board.receiveAttack(2, 2);

        expect(board.allShipsSunk()).toBe(false);
    });

});

describe("Ship placement", () => {
    it("places a ship horizontally on the board", () => {
        const board = new Gameboard();
        const ship = new Ship(3);

        board.placeShip(ship, 2, 2, "horizontal");

        expect(board.primaryGrid[2][2]).toBe(ship);
        expect(board.primaryGrid[2][3]).toBe(ship);
        expect(board.primaryGrid[2][4]).toBe(ship);
    });

    it("places a ship vertically on the board", () => {
        const board = new Gameboard();
        const ship = new Ship(4);

        board.placeShip(ship, 1, 5, "vertical");

        expect(board.primaryGrid[1][5]).toBe(ship);
        expect(board.primaryGrid[2][5]).toBe(ship);
        expect(board.primaryGrid[3][5]).toBe(ship);
        expect(board.primaryGrid[4][5]).toBe(ship);
    });

    it("throws an error when placing ship out of bounds", () => {
        const board = new Gameboard();
        const ship = new Ship(4);

        expect(() => {
            board.placeShip(ship, 9, 8, "horizontal");
        }).toThrow();
    });

    it("does not allow ships to overlap", () => {
        const board = new Gameboard();
        const ship1 = new Ship(3);
        const ship2 = new Ship(2);

        board.placeShip(ship1, 0, 0, "horizontal");

        expect(() => {
            board.placeShip(ship2, 0, 1, "vertical");
        }).toThrow();
    });

});

describe("receiveAttack", () => {
    it("calls hit() when attacking a ship", () => {
        const board = new Gameboard();
        const ship = new Ship(2);

        board.placeShip(ship, 0, 0, "horizontal");
        board.receiveAttack(0, 0);

        expect(ship.hits).toBe(1);
    });

    it("records missed attacks", () => {
        const board = new Gameboard();

        board.receiveAttack(5, 5);

        expect(board.trackingGrid[5][5]).toBe("miss");
    });

    it("does not allow attacking the same coordinate twice", () => {
        const board = new Gameboard();
        const ship = new Ship(2);

        board.placeShip(ship, 0, 0, "horizontal");

        board.receiveAttack(0, 0);
        board.receiveAttack(0, 0);

        expect(ship.hits).toBe(1);
    });

    it("throws an error for invalid attack coordinates", () => {
        const board = new Gameboard();

        expect(() => board.receiveAttack(-1, 0)).toThrow();
        expect(() => board.receiveAttack(10, 3)).toThrow();
    });

});




