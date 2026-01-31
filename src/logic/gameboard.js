import { Ship } from "./ship.js";
export class Gameboard {
    constructor() {
        const primaryGrid = []; //for placing ships
        const trackingGrid = []; //for receiving attacks
        for (let i = 0; i < 10; i++) {
            primaryGrid.push([]);
            trackingGrid.push([]);
            for (let j = 0; j < 10; j++) {
                primaryGrid[i].push(null);
                trackingGrid[i].push(null);
            }

        }
        this.primaryGrid = primaryGrid;
        this.trackingGrid = trackingGrid;
        this.fleet = new Set();
    }

    isValidPos(r, c) {
        if (r < 10 && r >= 0 &&
            c < 10 && c >= 0) return true;
        return false;
    }

    placeShip(ship, r, c, align) {
        const length = ship.length;
        if (!this.isValidPos(r, c)) throw new Error('cannot place ship here');
        if (align === 'horizontal') {
            for (let i = 0; i < length; i++) {
                if(!this.isValidPos(r,c+i) || this.primaryGrid[r][c+i] !== null) throw new Error('cannot place ship here');
            }
            for (let i = 0; i < length; i++) {
                this.primaryGrid[r][c + i] = ship;
            }
        }
        else{ //vertical
            for (let i = 0; i < length; i++) {
                if(!this.isValidPos(r+i,c) || this.primaryGrid[r+i][c] !== null) throw new Error('cannot place ship here');
            }
            for (let i = 0; i < length; i++) {
                this.primaryGrid[r + i][c] = ship;
            }
        }
        this.fleet.add(ship);
    }

    receiveAttack(r, c) {
        if(!this.isValidPos(r,c)) throw new Error('cannot hit out of grid')
        if (this.primaryGrid[r][c] !== null 
            && this.trackingGrid[r][c]===null) {
            const ship = this.primaryGrid[r][c];
            ship.hit();
            this.trackingGrid[r][c] = 'hit';
            if(ship.isSunk()){
                this.fleet.delete(ship);
            } 
        } else {
            this.trackingGrid[r][c] = 'miss';
        }
    }

    allShipsSunk(){
        return this.fleet.size===0;
    }
}