function createElement(type,className,text,){
    let el = document.createElement(type);
    if(text){
        el.textContent = text;
    }
    if(className){
        el.classList.add(className);
    }
    return el;
}

