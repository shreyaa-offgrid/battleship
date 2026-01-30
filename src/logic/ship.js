export class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
        this.hasSunk = false;
    }

    hit() {
        this.hits++;
    }

    isSunk(){
        if(this.length===this.hits){
            this.hasSunk = true;
        }
        return this.hasSunk;
    }
}

