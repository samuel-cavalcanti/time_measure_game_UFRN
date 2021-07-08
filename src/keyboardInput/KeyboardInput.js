export class KeyboardInput {


    events = {
        keydown: 'keydown',
        keyup: 'keyup'
    }


    observers = []
    keyupObservers = []
    keydownObservers = []

    notifyAll(key, observers) {

        for (let observer of observers)
            observer.receive(key)

    }

    enable() {
        for (let eventName of Object.values(this.events))
            document.addEventListener(eventName, this[eventName].bind(this), false)
    }

    disable() {
        for (let eventName of this.events)
            document.removeEventListener(eventName, this[eventName].bind(this), false)
    }

    keyup(event) {
        console.log('keyup', event.key)
     

        this.notifyAll(event.key, this.keyupObservers)
    }

    keydown(event) {
        console.log('keydown', event.key)

      


        this.notifyAll(event.key, this.keydownObservers)
    }




}