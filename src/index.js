import "./styles.css";
import { newGame, getCurrentTurn, switchTurn, isGameOver, setGameOver } from "./gameController.js";
import { renderBoard } from "./dom.js";

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

});










