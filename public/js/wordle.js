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
        correctCharacters.innerHTML = ""
        incorrectCharacters.innerHTML = ""
        Object.values(word.correctCharacters).forEach(letter => {
            correctCharacters.innerHTML += letter + " ";
        })
        Object.values(word.incorrectCharacters).forEach(letter => {
            incorrectCharacters.innerHTML += letter + " ";
        })
        correctCharacterPlacements.innerHTML = word.correctCharacterPlacements.join(" ");
        if (word.completed) {
            completed.innerHTML = "you win!";
        }
    })
    .catch(error => {
        console.log(error)
    })
})