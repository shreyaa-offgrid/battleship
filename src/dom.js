function createElement(type, className, text) {

    let el = document.createElement(type);
    if (text) el.textContent = text;
    if (className) el.classList.add(className);
    return el;
}

export function disableElement(el) {
    el.classList.add('disabled');
}

export function enableElement(el) {
    el.classList.remove('disabled');
}

export function createGrid(container) {

    container.innerHTML = "";
    for (let r = 0; r < 10; r++) {
        for (let c = 0; c < 10; c++) {
            let cell = createElement('div', 'cell');
            cell.dataset.row = r;
            cell.dataset.col = c;
            container.appendChild(cell);
        }
    }
}

export function renderBoard(gameboard, container, hideShips = false) {

    container.innerHTML = "";
    for (let r = 0; r < 10; r++) {
        for (let c = 0; c < 10; c++) {
            const cell = createElement("div", "cell");
            cell.dataset.row = r;
            cell.dataset.col = c;

            const primary = gameboard.primaryGrid[r][c];
            const tracking = gameboard.trackingGrid[r][c];

            if (tracking === 'hit') {
                const ship = primary;
                if (ship && ship.isSunk()) {
                    cell.classList.add('sunk');
                } else {
                    cell.classList.add('hit');
                }
            }
            else if (tracking === 'miss') {
                cell.classList.add('miss');
            } else if (primary !== null && !hideShips) {
                cell.classList.add('ship');
            }
            container.appendChild(cell);
        }
    }
}

export function highlightShipSelection(ship) {

    ship.classList.toggle('selected');
    shipImages.forEach(other => {
        if (other !== ship) {
            other.classList.remove('selected');
        }
    });
}

export function removeHighlightShip(selectedShip) {

    shipImages.forEach(ship => {
        ship.classList.remove('selected');
        if (ship.parentNode.classList.contains(selectedShip.type)) disableElement(ship);
    });
}

export function resetShips() {
    shipImages.forEach(ship => {
        enableElement(ship);
        ship.classList.remove('selected');
    })
}

export function clearPreview(grid) {

    grid.querySelectorAll(".preview-valid, .preview-invalid")
        .forEach(cell => {
            cell.classList.remove("preview-valid", "preview-invalid");
        });
}

export function showPreviewCells(grid, cells, valid) {

    cells.forEach(({ r, c }) => {
        const cell = grid.querySelector(`[data-row="${r}"][data-col="${c}"]`);
        if (!cell) return;

        cell.classList.add(valid ? "preview-valid" : "preview-invalid");
    });
}

const turnIndicator = document.querySelector(".turn-indicator>p");

export function showTurn(){
    turnIndicator.hidden = false;
}
export function hideTurn(){
    turnIndicator.hidden = true;
}

export const shipImages = document.querySelectorAll('dialog img');
export const newGameBtn = document.querySelector(".btn button");
export const placeShipDialog = document.querySelector("dialog");
export const beginBattleBtn = document.querySelector(".begin-battle");
export const resetPlacementBtn = document.querySelector(".reset-placement");