import { experiments } from "webpack";
import { Ship } from "../logic/ship.js";

describe('Ship', () => {
    it('initializes with correct length, type, alignment and zero hits', () => {
        const ship = new Ship(4, 'xyz', 'horizontal');

        expect(ship.length).toBe(4);
        expect(ship.hits).toBe(0);
        expect(ship.align).toBe('horizontal');
        expect(ship.type).toBe('xyz');
        expect(ship.isSunk()).toBe(false)
    });

    it('increments hits when hit() is called', () => {
        const ship = new Ship(3);
        ship.hit();
        ship.hit();
        expect(ship.hits).toBe(2);
    });

    it('reports sunk when hits equal length', () => {
        const ship = new Ship(2);
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(true);
    })
})
