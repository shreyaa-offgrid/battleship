import { Player } from "./logic/player.js";
import { Ship } from "./logic/ship.js";
import { markShipOnGrid, createGrid } from "./dom.js";

export function newGame() {
    const humanPlayer = new Player('human');
    const computerPlayer = new Player('computer');

    const computerGameboard = computerPlayer.gameboard;
    const humanGameboard = humanPlayer.gameboard;

    const playerOcean = document.querySelector(".player-container .ocean-grid");
    createGrid(playerOcean);
    const computerOcean = document.querySelector(".computer-container .ocean-grid");
    createGrid(computerOcean);
    
    const fleet = [{ len: 5, r: 0, c: 0, align: 'horizontal', type: 'carrier' },
    { len: 4, r: 1, c: 0, align: 'vertical', type: 'battleship' },
    { len: 3, r: 2, c: 5, align: 'horizontal', type: 'submarine' },
    { len: 3, r: 3, c: 9, align: 'vertical', type: 'destroyer' },
    { len: 2, r: 7, c: 3, align: 'horizontal', type: 'patrol-boat' }];

    fleet.forEach(ship => {
        const newShip = new Ship(ship.len, ship.type, ship.align);
        computerGameboard.placeShip(newShip, ship.r, ship.c);
        markShipOnGrid(computerOcean, ship.r,ship.c, ship.align, ship.len);
        humanGameboard.placeShip(newShip, ship.r, ship.c);
        markShipOnGrid(playerOcean, ship.r, ship.c, ship.align, ship.len);
    });
}
