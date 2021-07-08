import { Observer } from "../utils/observer.js"


export default class GameAudio {
    audioFiles = {
        battle: 'battle',
        collect: 'collect',
        marimba: 'marimba',
        solveThePuzzle: 'solveThePuzzle',
        fail: 'fail'
    }

    observerPlayerDecision = new Observer(this.playerDecision.bind(this))

    constructor() {
        this.audios = this.loadAudios()
    }

    loadAudios() {
        let audios = {}

        for (let file of Object.values(this.audioFiles))
            audios[file] = new Audio(`assets/audios/${file}.mp3`)

        return audios
    }


    playAudio(audio) {

        if (this.audios[audio])
            this.audios[audio].play()


    }


    playCollect() {
        this.playAudio(this.audioFiles.collect)
    }

    playFail() {
        this.playAudio(this.audioFiles.fail)
    }


    playerDecision(correctAnswer) {
        if (correctAnswer)
            this.playCollect()
        else
            this.playFail()
    }
}