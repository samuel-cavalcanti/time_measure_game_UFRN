export class Ball {
    constructor(position, color, radius) {
        this.pos = position
        this.color = color
        this.radius = radius
        

    }


    draw(screen) {

        const context2D = screen.context2D

        const defaultFillStyle = context2D.fillStyle

        context2D.beginPath();
        context2D.arc(this.pos.x * screen.width, this.pos.y * screen.height, this.radius * screen.radius, 0, Math.PI * 2, true); // Círculo exterior
        context2D.fillStyle = this.color
        context2D.fill();

        context2D.fillStyle = defaultFillStyle
    }


    collision(anotherObjectPos) {

        const deltaX = anotherObjectPos.x - this.pos.x
        const deltaY = anotherObjectPos.y - this.pos.y

        const deltaRadius = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2))

        return deltaRadius < this.radius

    }


}
