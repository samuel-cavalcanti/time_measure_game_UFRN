export class EndGameMessage {


    constructor(score, numberOfTries, meanReactions) {

        this.scoreMessage = `Score: ${score}`
        this.numberOfTriesMessage = `Número de tentativas ${numberOfTries}`
        this.meanReactionsMessage = `tempo médio de reação ${meanReactions.toFixed(2)} segundos`


    }


    draw(screen) {

        const context2D = screen.context2D
        
        context2D.font = '30px Arial'
        context2D.textAlign = 'center'

        context2D.fillText(this.numberOfTriesMessage, 0.5 * screen.width, 0.4 * screen.height)
        context2D.fillText(this.scoreMessage, 0.5 * screen.width, 0.5 * screen.height)
        context2D.fillText(this.meanReactionsMessage, 0.5 * screen.width, 0.6 * screen.height)
    }

}