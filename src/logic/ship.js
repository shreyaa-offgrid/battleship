export class Ship {
    constructor(length, type) {
        this.type = type;
        this.length = length;
        this.hits = 0;
    }

    hit() {
        this.hits++;
    }

    isSunk(){
        return this.hits>=this.length;
    }
}

