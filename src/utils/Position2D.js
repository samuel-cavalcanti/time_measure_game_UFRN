export class Position2D {
    constructor(x, y) {
        this.x = x
        this.y = y
    }


    static rand() {
        const x = Math.random() * 0.84 + 0.1 //0.94, 0.1
        const y = Math.random() * 0.84 + 0.1

        return new Position2D(x, y)
    }
}