import { Player } from "./logic/player.js";
import { Ship } from "./logic/ship.js";

let currentTurn = 'human'; //or computer
let gameOver = false;
let setupPhase = true;

let selectedShip = null;
let currentOrientation = 'horizontal';
let shipsRemaining = 5;

export function switchTurn() {
    currentTurn = currentTurn === 'human' ? 'computer' : 'human';
}

export function getCurrentTurn() {
    return currentTurn;
}

export function isGameOver() {
    return gameOver;
}

export function setGameOver() {
    gameOver = true;
}

export const shipsToPlace = [{ len: 5, type: 'carrier' },
{ len: 4, type: 'battleship' },
{ len: 3, type: 'submarine' },
{ len: 3, type: 'destroyer' },
{ len: 2, type: 'patrol-boat' }];

export function isSetupPhase() {
    return setupPhase;
}

export function finishSetup() {
    setupPhase = false;
}

export function selectShip(ship) {
    let typeClass = ship.parentNode.classList[1];
    let idx = shipsToPlace.findIndex((s) => s.type === typeClass);
    selectedShip = shipsToPlace[idx];
}

export function rotateShip() {
    currentOrientation = currentOrientation === 'horizontal' ? 'vertical' : 'horizontal';
}

export function getSelectedShip() {
    return selectedShip;
}

export function getOrientation() {
    return currentOrientation;
}

export function isPlacementValid(gameboard, cells) {

    for (const { r, c } of cells) {

        if (r < 0 || r >= 10 || c < 0 || c >= 10)
            return false;

        if (gameboard.primaryGrid[r][c] !== null)
            return false;
    }

    return true;
}

export function getPreviewCells(row, col, length, orientation) {
    const cells = [];

    for (let i = 0; i < length; i++) {
        if (orientation === "horizontal") {
            cells.push({ r: row, c: col + i });
        } else {
            cells.push({ r: row + i, c: col });
        }
    }

    return cells;
}

export function resetPlacement() {

}

export function newGame() {
    currentTurn = "human";
    gameOver = false;
    setupPhase = true;

    const humanPlayer = new Player('human');
    const computerPlayer = new Player('computer');

    const fleet = [{ len: 5, r: 1, c: 1, align: 'horizontal', type: 'carrier' },
    { len: 4, r: 3, c: 0, align: 'vertical', type: 'battleship' },
    { len: 3, r: 4, c: 5, align: 'horizontal', type: 'submarine' },
    { len: 3, r: 3, c: 9, align: 'vertical', type: 'destroyer' },
    { len: 2, r: 8, c: 3, align: 'horizontal', type: 'patrol-boat' }];

    fleet.forEach(ship => {
        const computerShip = new Ship(ship.len, ship.type, ship.align);
        computerPlayer.gameboard.placeShip(computerShip, ship.r, ship.c);
    });
    return { humanPlayer, computerPlayer };
}
//new game should reset placement and open set up phase
//rotation doesnt immediately change preview
