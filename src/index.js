import "./styles.css";
import { newGame } from "./gameController.js";
import { renderBoard } from "./dom.js";

document.addEventListener("DOMContentLoaded",()=>{
    const {humanPlayer, computerPlayer} = newGame();

    const playerGrid = document.querySelector(".player-container .ocean-grid");
    const computerGrid = document.querySelector(".computer-container .ocean-grid");

    renderBoard(humanPlayer.gameboard, playerGrid);
    renderBoard(computerPlayer.gameboard, computerGrid, true);
})




