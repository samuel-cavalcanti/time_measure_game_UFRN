import { Ball } from "../ball/ball.js";
import { EndGameMessage } from "../score/EndGameMessage.js";
import { Color } from "../utils/Color.js";
import { Observer } from "../utils/observer.js";
import { Position2D } from "../utils/Position2D.js";

export class TimeMeasureGame {

    status = {
        running: 1,
        waiting: 2
    }

    controls = {
        w: new Color().red,
        s: new Color().yellow,
        a: new Color().blue,
        d: new Color().green
    }

    renderObservers = []
    playerDecisionObservers = []

    keydownObserver = new Observer(this.keydown.bind(this))

    constructor(numberOfTries = 10) {

        this.startNumberOfTries = numberOfTries

        this.setWaitingState()

    }

    setWaitingState() {
        this.state = {
            currentNumberOfTries: this.startNumberOfTries,
            gameStatus: this.status.waiting,
            currentBall: undefined,
            score: 0,
            objectsToRender: [],
            reactions: [],
            timeOfBallIsAddedInMilliseconds: undefined
        }
    }


    start() {

        if (this.state.gameStatus !== this.status.waiting)
            return

        this.setWaitingState()

        this.addBall()

        this.state.gameStatus = this.status.running


        this.notifyRender()
    }

    end() {
        delete this.state.objectsToRender

        const sum = this.state.reactions.reduce((previous, current) => previous + current)
        const mean = sum / this.state.reactions.length
        const meanReactionsInSeconds = mean / 1000

        this.state.objectsToRender = [new EndGameMessage(this.state.score, 10, meanReactionsInSeconds)]

        this.state.gameStatus = this.status.waiting
    }

    keydown(key) {

        if (this.controls[key])
            this.colorChoice(this.controls[key])
    }

    colorChoice(color) {

        if (this.state.gameStatus !== this.status.running)
            return

        this.updateScore(color)

        this.mesureReaction()

        this.removeBall()

        this.updateTries()

        this.notifyRender()
    }


    updateScore(color) {
        const isCorrectColor = color == this.state.currentBall.color
        if (isCorrectColor)
            this.state.score++
        else
            this.state.score--

        this.notifyObservers(isCorrectColor, this.playerDecisionObservers)
    }


    mesureReaction() {
        const reactedTimeInMilliseconds = new Date().getTime() //Return the number of milliseconds since 1970/01/01:

        this.state.reactions.push(reactedTimeInMilliseconds - this.state.timeOfBallIsAddedInMilliseconds)


    }

    addBall() {
        const radius = 0.1
        this.state.currentBall = new Ball(Position2D.rand(), new Color().rand(), radius)
        this.state.objectsToRender.push(this.state.currentBall)
        this.state.timeOfBallIsAddedInMilliseconds = new Date().getTime() //Return the number of milliseconds since 1970/01/01:
    }

    removeBall() {
        this.state.objectsToRender.splice(this.state.objectsToRender.indexOf(this.currentBall), 1)
    }

    updateTries() {
        this.state.currentNumberOfTries--

        if (this.state.currentNumberOfTries === 0)
            this.end()
        else
            this.addBall()

    }

    notifyRender() {
        this.notifyObservers(this.state.objectsToRender, this.renderObservers)
    }

    notifyObservers(message, observers) {

        for (const observe of observers) {
            observe.receive(message)
        }
    }

}