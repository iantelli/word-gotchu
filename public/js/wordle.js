function startNewGame() {
    document.querySelector("span.correctCharacters").innerHTML = "Correct Characters: "
    document.querySelector("span.incorrectCharacters").innerHTML = "Incorrect Characters: "
    document.querySelector("span.correctCharacterPlacements").innerHTML = "_ _ _ _ _";
    document.querySelector("span.totalGuesses").innerHTML = "Total guesses: 0"
}

document.querySelector("button").addEventListener("click", event => {
    event.preventDefault();
    axios.post("/api/v1/lobby", {
        word: document.querySelector("input.submitWord").value
    })
    .then(response => {
        const correctCharacters = document.querySelector("span.correctCharacters");
        const incorrectCharacters = document.querySelector("span.incorrectCharacters");
        const totalGuesses = document.querySelector("span.totalGuesses");
        const correctCharacterPlacements = document.querySelector("span.correctCharacterPlacements");
        const completed = document.querySelector("span.completed");
        const word = response.data.word
        document.querySelector("input.submitWord").value = "";
        completed.innerHTML = ""
        correctCharacters.innerHTML = "Correct Characters: "
        incorrectCharacters.innerHTML = "Incorrect Characters: "
        Object.values(word.correctCharacters).forEach(letter => {
            correctCharacters.innerHTML += letter + " ";
        })
        Object.values(word.incorrectCharacters).forEach(letter => {
            incorrectCharacters.innerHTML += letter + " ";
        })
        correctCharacterPlacements.innerHTML = word.correctCharacterPlacements.join(" ");
        totalGuesses.innerHTML = "Total guesses: " + word.totalGuesses;
        if (word.completed) {
            axios.post("/api/v1/lobbyWin", {
                word
            })
            completed.innerHTML = `correct! The word was ${word.correctCharacterPlacements.join("")}`;
            startNewGame();
        }
        if (word.totalGuesses == 5 && !word.completed) {
            axios.post("/api/v1/lobbyLose", {
                word
            })
            completed.innerHTML = `Too many incorrect guesses! Start a new game!`;
            startNewGame();
        }
    })
    .catch(error => {
        console.log(error)
    })
})

startNewGame()