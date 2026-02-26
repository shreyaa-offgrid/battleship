import { Player } from "./logic/player.js";
import { Ship } from "./logic/ship.js";

export function newGame() {
    const humanPlayer = new Player('human');
    const computerPlayer = new Player('computer');

    const fleet = [{ len: 5, r: 1, c: 1, align: 'horizontal', type: 'carrier' },
    { len: 4, r: 3, c: 0, align: 'vertical', type: 'battleship' },
    { len: 3, r: 4, c: 5, align: 'horizontal', type: 'submarine' },
    { len: 3, r: 3, c: 9, align: 'vertical', type: 'destroyer' },
    { len: 2, r: 8, c: 3, align: 'horizontal', type: 'patrol-boat' }];

    fleet.forEach(ship => {
        const humanShip = new Ship(ship.len, ship.type, ship.align);
        humanPlayer.gameboard.placeShip(humanShip, ship.r, ship.c);

        const computerShip = new Ship(ship.len, ship.type, ship.align);
        computerPlayer.gameboard.placeShip(computerShip, ship.r, ship.c);
    });
    return {humanPlayer, computerPlayer};
}
