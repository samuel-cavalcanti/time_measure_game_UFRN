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
        const key = event.key.toLowerCase();
        console.log('keyup',key)


        this.notifyAll(key, this.keyupObservers)
    }

    keydown(event) {
        const key = event.key.toLowerCase();
        console.log('keydown', key)




        this.notifyAll(key.toLowerCase(), this.keydownObservers)
    }




}