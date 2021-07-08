
import GameAudio from "./gameAudio/gameAudio.js"
import { ControlsImageAnimation } from "./keyboardInput/ControlsImageAnimation.js"
import { KeyboardInput } from "./keyboardInput/KeyboardInput.js"

import { Screen } from "./screen/screen.js"
import { TimeMeasureGame } from "./timeMeasureGame/timeMeasureGame.js"




const htmlCanvas = document.getElementById('canvas2D')


const screen = new Screen(htmlCanvas)

const gameAudio = new GameAudio()

const keyboard = new KeyboardInput()
keyboard.enable()

const controlImageAnimation = new ControlsImageAnimation()
keyboard.keyupObservers.push(controlImageAnimation.keyupObserver);
keyboard.keydownObservers.push(controlImageAnimation.keydownObserver)


const timeMeasureGame = new TimeMeasureGame()

timeMeasureGame.renderObservers.push(screen.observeRender)
timeMeasureGame.playerDecisionObservers.push(gameAudio.observerPlayerDecision)

keyboard.keydownObservers.push(timeMeasureGame.keydownObserver)


const startGameButton = document.getElementById('start-game-button')
startGameButton.onclick = () => {
    timeMeasureGame.restart()
    startGameButton.innerHTML = 'restart'
}



