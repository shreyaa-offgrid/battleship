import { Gameboard } from "../logic/gameboard.js";
export class Player {
    constructor(type) {
        this.type = type;
        this.gameboard = new Gameboard();
    }

    attack(enemy, r, c) { 
        if(!this.gameboard.isValidPos(r,c)) throw new Error('invalid coordinates');
        if(enemy.gameboard.trackingGrid[r][c]!==null) throw new Error('already attacked');
        if (enemy === this) {
            throw new Error("player cannot attack itself");
        }
        enemy.gameboard.receiveAttack(r, c);
    }

    makeMove(enemy) { 
        if (this.type !== "computer") throw new Error("only computer players can make automatic moves");
        if(enemy.gameboard.allShipsSunk()) throw new Error('no ship afloat to attack')

        let r, c;
        do {
            r = Math.floor(Math.random() * 10);
            c = Math.floor(Math.random() * 10);
        } while (enemy.gameboard.trackingGrid[r][c] !== null);

        this.attack(enemy, r, c);
    }

    isComputer(){
        return this.type==='computer';
    }
}