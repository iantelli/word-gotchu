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
reScaleWhatever(backgroundElement)