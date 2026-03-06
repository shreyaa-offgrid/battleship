import "./styles.css";
import { newGame, getCurrentTurn, switchTurn,
     isGameOver, setGameOver, resetPlacement,
      finishSetup, selectShip, isSetupPhase,
       rotateShip, getSelectedShip, getOrientation,
        isPlacementValid, getPreviewCells } from "./gameController.js";
import { beginBattleBtn, highlightShipSelection,
     newGameBtn, placeShipDialog, renderBoard,
      resetPlacementBtn, shipImages, clearPreview,
       showPreviewCells } from "./dom.js";
import { Ship } from "./logic/ship.js";

document.addEventListener("DOMContentLoaded", () => {

    const { humanPlayer, computerPlayer } = newGame();
    const playerGrid = document.querySelector(".human-container .ocean-grid");
    const computerGrid = document.querySelector(".computer-container .ocean-grid");

    renderBoard(humanPlayer.gameboard, playerGrid);
    renderBoard(computerPlayer.gameboard, computerGrid, true);

    function handlePlayerAttack(row, col) {

        if (getCurrentTurn() !== "human") return;

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

        humanPlayer.gameboard.attackHuman();
        renderBoard(humanPlayer.gameboard, playerGrid);

        if (humanPlayer.gameboard.allShipsSunk()) {
            setGameOver();
            alert("Computer wins!");
            return;
        }

        switchTurn();
    }

    computerGrid.addEventListener('click', (e) => {

        if (!e.target.classList.contains('cell')) {
            console.log('cannot hit grid line');
            return;
        }

        const row = Number(e.target.dataset.row);
        const col = Number(e.target.dataset.col);

        if (isGameOver()) return;
        handlePlayerAttack(row, col);
    });

    newGameBtn.addEventListener('click', () => {
        newGame();
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
    });


    shipImages.forEach(ship => {
        ship.addEventListener('click', () => {
            selectShip(ship);
            highlightShipSelection(ship, shipImages);
        });
    });

    if (isSetupPhase()) {
        document.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() === 'r') {
                rotateShip();
            }
        })
    }

    playerGrid.addEventListener("mousemove", (e) => {

        if (!e.target.classList.contains("cell")) return;

        const row = Number(e.target.dataset.row);
        const col = Number(e.target.dataset.col);

        const ship = getSelectedShip();
        if (!ship) return;

        const orientation = getOrientation();

        const cells = getPreviewCells(row, col, ship.len, orientation);

        clearPreview(playerGrid);

        const valid = isPlacementValid(humanPlayer.gameboard, cells);

        showPreviewCells(playerGrid, cells, valid);
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
    });

    playerGrid.addEventListener("mouseleave", () => {
        clearPreview(playerGrid);
    });
});










