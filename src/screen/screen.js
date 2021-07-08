import { Observer } from "../utils/observer.js"

export class Screen {


    objects2D = []
    requestAnimationID = 0

    observeRender = new Observer(this.toRender.bind(this))

    constructor(htmlCanvas) {
        this.context2D = htmlCanvas.getContext('2d')

        htmlCanvas.onresize = () => {
            htmlCanvas.width = htmlCanvas.scrollWidth
            htmlCanvas.height = htmlCanvas.scrollHeight

            this.width = htmlCanvas.width
            this.height = htmlCanvas.height

            this.radius = Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2)) / 2
        }
        htmlCanvas.onresize()
    }

    clearObjects2D() {
        delete this.addObject2D
        this.objects2D = []
    }


    addObject2D(object) {
        this.objects2D.push(object)
    }

    removeObject2D(object) {
        const index = this.objects2D.indexOf(object)

        if (index !== -1)
            this.objects2D.splice(index, 1)
    }

    enable() {
        this.requestAnimationID = requestAnimationFrame(this.draw.bind(this))
    }

    disable() {
        if (this.requestAnimationID === 0)
            return
        cancelAnimationFrame(this.requestAnimationID)

        this.requestAnimationID = 0
    }

    draw() {

        this.context2D.clearRect(0, 0, this.width, this.height)

      

        for (const object2D of this.objects2D)
            object2D.draw(this)



        this.requestAnimationID = requestAnimationFrame(this.draw.bind(this))

    }

    toRender(objects2D) {
        if (!objects2D)
            this.disable()

        this.objects2D = objects2D

        if (this.requestAnimationID === 0)
            this.enable()

    }




}