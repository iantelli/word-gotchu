function randomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// Used to be createGame
function createWordle() {
    const game = {
        totalGuesses: 0,
        completed: false,
        correctCharacterPlacements: new Array(5).fill("_"),
        answer: randomWord(),
    }

    return game;
}

const backgroundElement = document.querySelector(".background")

function reScaleWhatever() {
    const scaleWidth = window.innerWidth / 1440
    const scaleHeight = window.innerHeight / 1024
    backgroundElement.style.transform = `scale(${scaleWidth, scaleHeight}`
    const y = 1024 * (1029 / (backgroundElement.offsetHeight + 35))
    // const backgroundStyle = `url("../images/assets_spritesheet.png") no-repeat -0px -${y}px`
}

window.addEventListener("resize", event => {
    reScaleWhatever()
})

reScaleWhatever()

// Get default gotchu from homepage or db or something
function fillPlayerGotchus() {
    const playerGotchu = "catchuEvo2";
    const opponentGotchu = "dogchuEvo3";
    const playerGotchuContainer = document.querySelector(".gochuCharacters .playerCharacter");
    const opponentGotchuContainer = document.querySelector(".gochuCharacters .opponentCharacter");
    playerGotchuContainer.innerHTML = `<div class="${playerGotchu}"></div>`;
    opponentGotchuContainer.innerHTML = `<div class="${opponentGotchu}"></div>`;
}