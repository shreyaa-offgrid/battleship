function createElement(type,className,text){
    let el = document.createElement(type);
    if(text){
        el.textContent = text;
    }
    if(className){
        el.classList.add(className);
    }
    return el;
}

export function createGrid(ocean) {
    ocean.innerHTML = "";

    for (let r = 0; r < 10; r++) {
        for (let c = 0; c < 10; c++) {
            let oceanPatch = createElement('div', 'water','X');
            oceanPatch.dataset.row = r;
            oceanPatch.dataset.col = c;
            ocean.appendChild(oceanPatch);
        }
    }
}


