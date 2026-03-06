import "./styles.css";
import {
    newGame, getCurrentTurn, switchTurn, isGameOver,
    setGameOver, resetPlacement, finishSetup, selectShip,
    isSetupPhase, rotateShip, getSelectedShip, getOrientation,
    isPlacementValid, getPreviewCells, unselectShip,
    shipPlaced, getShipsRemaining, computerAttack
} from "./gameController.js";
import {
    beginBattleBtn, highlightShipSelection, newGameBtn,
    placeShipDialog, renderBoard, resetPlacementBtn, shipImages,
    clearPreview, showPreviewCells
} from "./dom.js";
import { Ship } from "./logic/ship.js";

document.addEventListener("DOMContentLoaded", () => {

    let humanPlayer;
    let computerPlayer;

    const playerGrid = document.querySelector(".human-container .ocean-grid");
    const computerGrid = document.querySelector(".computer-container .ocean-grid");

    function startGame() {
        const players = newGame();
        humanPlayer = players.humanPlayer;
        computerPlayer = players.computerPlayer;

        renderBoard(humanPlayer.gameboard, playerGrid);
        renderBoard(computerPlayer.gameboard, computerGrid, true);
    }

    startGame();

    function handlePlayerAttack(row, col) {

        if (getCurrentTurn() !== "human") return;
        if (isSetupPhase()) return;

        const valid = computerPlayer.gameboard.receiveAttack(row, col);
        if (!valid) return;

        renderBoard(computerPlayer.gameboard, computerGrid, true);

        if (computerPlayer.gameboard.allShipsSunk()) {
            setGameOver();
            alert("You win!");
            return;
        }

        switchTurn();
        setTimeout(handleComputerAttack, 750);
    }

    function handleComputerAttack() {

        if (getCurrentTurn() !== "computer") return;
        if (isSetupPhase()) return;

        computerAttack(humanPlayer.gameboard);
        renderBoard(humanPlayer.gameboard, playerGrid);

        if (humanPlayer.gameboard.allShipsSunk()) {
            setGameOver();
            alert("Computer wins!");
            return;
        }

        switchTurn();
    }

    computerGrid.addEventListener('click', (e) => {
        if (!e.target.classList.contains('cell')) return;
        if (isGameOver()) return;

        const row = Number(e.target.dataset.row);
        const col = Number(e.target.dataset.col);

        handlePlayerAttack(row, col);
    });

    newGameBtn.addEventListener('click', () => {
        startGame();
        resetPlacement();
        placeShipDialog.show();
        newGameBtn.style.display = 'none';
    });

    beginBattleBtn.addEventListener('click', () => {
        placeShipDialog.close();
        newGameBtn.style.display = 'block';
        finishSetup();
    });

    resetPlacementBtn.addEventListener('click', () => {
        resetPlacement();
        humanPlayer.gameboard.primaryGrid = Array.from({ length: 10 }, () => Array(10).fill(null));
        humanPlayer.gameboard.trackingGrid = Array.from({ length: 10 }, () => Array(10).fill(null));
        computerPlayer.gameboard.trackingGrid = Array.from({ length: 10 }, () => Array(10).fill(null));
        humanPlayer.gameboard.fleet.clear();
        renderBoard(humanPlayer.gameboard, playerGrid);
        renderBoard(computerPlayer.gameboard, computerGrid, true);
    });


    shipImages.forEach(ship => {
        ship.addEventListener('click', () => {
            selectShip(ship);
            highlightShipSelection(ship, shipImages);
        });
    });

    let lastHoverRow = null;
    let lastHoverCol = null;

    function updatePreview(row, col) {

        const ship = getSelectedShip();
        if (!ship) return;

        const orientation = getOrientation();
        const cells = getPreviewCells(row, col, ship.len, orientation);

        clearPreview(playerGrid);

        const valid = isPlacementValid(humanPlayer.gameboard, cells);

        showPreviewCells(playerGrid, cells, valid);
    }

    if (isSetupPhase()) {
        document.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() === 'r') rotateShip();
            if (lastHoverRow !== null && lastHoverCol !== null) {
                updatePreview(lastHoverRow, lastHoverCol);
            }
        });
    }

    playerGrid.addEventListener("mousemove", (e) => {
        if (!e.target.classList.contains("cell")) return;

        const row = Number(e.target.dataset.row);
        const col = Number(e.target.dataset.col);
        lastHoverRow = row;
        lastHoverCol = col;

        updatePreview(row, col);
    });

    playerGrid.addEventListener("click", (e) => {
        if (!e.target.classList.contains("cell")) return;

        const row = Number(e.target.dataset.row);
        const col = Number(e.target.dataset.col);

        const ship = getSelectedShip();
        if (!ship) return;

        const newShip = new Ship(ship.len, ship.type, getOrientation());

        let valid = humanPlayer.gameboard.placeShip(newShip, row, col);
        if (!valid) return;
        renderBoard(humanPlayer.gameboard, playerGrid);

        shipPlaced();
        if (getShipsRemaining() === 0) {
            beginBattleBtn.classList.remove('disabled');
        }

        unselectShip(ship);
    });

    playerGrid.addEventListener("mouseleave", () => {
        clearPreview(playerGrid);
    });
});










