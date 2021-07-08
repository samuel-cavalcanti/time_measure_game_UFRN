export class Color {
    red = 'red'
    blue = 'blue'
    yellow = 'yellow'
    green = 'green'

    rand() {
        const colors = [this.red, this.blue, this.yellow, this.green];
        const randomInt = Math.floor(Math.random() * colors.length);
        return colors[randomInt]
    }
}
