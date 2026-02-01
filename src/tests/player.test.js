import { Player } from "../logic/player.js";
import { Gameboard } from "../logic/gameboard.js";
import { Ship } from "../logic/ship.js";

describe('Player', () => {
    it('creates a player with its own gameboard', () => {
        const player = new Player('human');
        expect(player.gameboard).toBeInstanceOf(Gameboard);
    });

    it("stores the player type", () => {
        const human = new Player("human");
        const computer = new Player("computer");

        expect(human.type).toBe("human");
        expect(computer.type).toBe("computer");
    });

    it("can attack another player's gameboard", () => {
        const attacker = new Player("human");
        const defender = new Player("human");
        const ship = new Ship(1);
        defender.gameboard.placeShip(ship, 0, 0, "horizontal");
        attacker.attack(defender, 0, 0);

        expect(ship.hits).toBe(1);
    });

    it("does not allow attacking invalid coordinates", () => {
        const p1 = new Player("human");
        const p2 = new Player("human");

        expect(() => p1.attack(p2, -1, 0)).toThrow('invalid coordinates');
        expect(() => p1.attack(p2, 10, 3)).toThrow('invalid coordinates');
    });


    it("computer player exposes a method to make a move", () => {
        const computer = new Player("computer");
        expect(typeof computer.makeMove).toBe("function");
    });

    it("does not allow a player to attack the same enemy coordinate twice", () => {
        const attacker = new Player("human");
        const defender = new Player("human");
        attacker.attack(defender, 1, 1);

        expect(() => {
            attacker.attack(defender, 1, 1);
        }).toThrow();
    });

    it("computer cannot make a move if the enemy has no ships left", () => {
        const computer = new Player("computer");
        const human = new Player("human");

        expect(() => {
            computer.makeMove(human);
        }).toThrow();
    });

    it("can report whether the player is a computer", () => {
        const computer = new Player("computer");
        const human = new Player("human");

        expect(computer.isComputer()).toBe(true);
        expect(human.isComputer()).toBe(false);
    });

    it("computer only attacks legal, unvisited coordinates", () => {
        const computer = new Player("computer");
        const human = new Player("human");
        const ship = new Ship(1);
        human.gameboard.placeShip(ship, 9, 9, "horizontal");
        for (let r = 0; r < 10; r++) {
            for (let c = 0; c < 10; c++) {
                human.gameboard.trackingGrid[r][c] = "miss";
            }
        }
        human.gameboard.trackingGrid[9][9] = null;
        computer.makeMove(human);

        expect(human.gameboard.trackingGrid[9][9]).toBe("hit");
    });
});
