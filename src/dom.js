function createElement(type, className, text) {
    let el = document.createElement(type);
    if (text) el.textContent = text;
    if (className) el.classList.add(className);
    return el;
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

export function renderBoard(gameboard, container, hideShips = false){
    container.innerHTML = "";

    for(let r = 0;r<10;r++){
        for(let c = 0;c<10;c++){
            const cell = createElement("div","cell");
            cell.dataset.row = r;
            cell.dataset.col = c;

            const primary = gameboard.primaryGrid[r][c];
            const tracking = gameboard.trackingGrid[r][c];

            if(tracking === 'hit'){
                cell.classList.add('hit');
            }
            else if(tracking === 'miss'){
                cell.classList.add('miss');
            } else if(primary!==null && !hideShips){
                cell.classList.add('ship');
            }
            container.appendChild(cell);
        }
    }
}

export let gameFlowBtn = document.querySelector(".btn button");
export let placeShipDialog = document.querySelector("dialog");


