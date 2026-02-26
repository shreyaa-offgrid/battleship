export class Ship {
    constructor(length, type, align) {
        this.type = type;
        this.length = length;
        this.hits = 0;
        this.align = align;
    }

    hit() {
        this.hits++;
    }

    isSunk(){
        return this.hits>=this.length;
    }
}

