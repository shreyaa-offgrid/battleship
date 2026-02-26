function createElement(type, className, text) {
    let el = document.createElement(type);
    if (text) {
        el.textContent = text;
    }
    if (className) {
        el.classList.add(className);
    }
    return el;
}

export function createGrid(ocean) {
    ocean.innerHTML = "";
    for (let r = 0; r < 10; r++) {
        for (let c = 0; c < 10; c++) {
            let oceanPatch = createElement('div', 'water');
            oceanPatch.dataset.row = r;
            oceanPatch.dataset.col = c;
            ocean.appendChild(oceanPatch);
        }
    }
}

export function markShipOnGrid(ocean, r, c, align, length) {
    if (align === 'horizontal') {
        for (let i = 0; i < length; i++) {
            let shipPatch = ocean.querySelector(
                `[data-row="${r}"][data-col="${c + i}"]`
            );
            shipPatch.classList.add('ship');
        }
    } else {
        for (let i = 0; i < length; i++) {
            let shipPatch = ocean.querySelector(
                `[data-row="${r+i}"][data-col="${c}"]`
            );
            shipPatch.classList.add('ship');
        }
    }

}


