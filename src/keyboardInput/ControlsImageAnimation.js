import { Observer } from "../utils/observer.js"

export class ControlsImageAnimation {
    primaryColors = {}
    secondaryColors = {}

    keydownObserver = new Observer(this.keydown.bind(this));
    keyupObserver = new Observer(this.keyup.bind(this));

    constructor() {

        const svg = 'svg'

        const controls = ['w', 's', 'a', 'd']

        for (const key of controls) {
            this[key] = document.getElementById(`${key}.${svg}`)
            this.extractColor(key)
        }

    }

    extractColor(key) {
        this.primaryColors[key] = this[key].style.backgroundColor
        this.secondaryColors[key] = this.extractSecondaryColor(this[key].style.backgroundColor)

        console.log(this.secondaryColors[key])
    }

    keyup(key) {
       
        if (!this[key])
            return

        this[key].style.backgroundColor = this.primaryColors[key]


        console.log(this[key].style.backgroundColor)

    }

    keydown(key) {
    

        if (!this[key])
            return

        this[key].style.backgroundColor = this.secondaryColors[key]
        console.log(this[key].style.backgroundColor, this.secondaryColors[key])
    }

    extractSecondaryColor(backgroundColor) {
        const subStringRGB = backgroundColor.split('rgb')[1] // ["", "(255, 0, 0)"]

        let [r, g, b] = subStringRGB.split(',') // ["(255", " 0", " 0)"]

        r = r.split('(')[1] // ["",255]

        b = b.split(')')[0] // [" 0",""]

        return `rgba(${r},${g},${b},0.5)`
    }


}