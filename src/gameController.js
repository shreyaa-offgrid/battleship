import { Player } from "./logic/player.js";
import { Ship } from "./logic/ship.js";

const computerPlayer = new Player('computer');
const computerGameboard = computerPlayer.gameboard;

const fleet = [{ len: 5, r: 0, c: 0, align: 'horizontal', type: 'carrier' },
{ len: 4, r: 1, c: 0, align: 'vertical', type: 'battleship' },
{ len: 3, r: 2, c: 5, align: 'horizontal', type: 'submarine' },
{ len: 3, r: 3, c: 9, align: 'vertical', type: 'destroyer' },
{ len: 2, r: 7, c: 3, align: 'horizontal', type: 'patrol-boat' }];

fleet.forEach(ship => {
    const newShip = new Ship(ship.len, ship.type);
    computerGameboard.placeShip(newShip, ship.r, ship.c, ship.align);
});
