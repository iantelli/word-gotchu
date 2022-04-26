function startNewGame() {
    document.querySelector("span.correctCharacters").innerHTML = "Correct Characters: "
    document.querySelector("span.incorrectCharacters").innerHTML = "Incorrect Characters: "
    document.querySelector("span.totalGuesses").innerHTML = "Total guesses: 0";
    document.querySelectorAll("span.letter").forEach(element => {
        element.remove();
    });
}


document.querySelector("button").addEventListener("click", event => {
    event.preventDefault();
    axios.post("/api/v1/lobby", {
        word: document.querySelector("input.submitWord").value
    })
    .then(response => {
        let div = document.createElement("div");

        const word = response.data.word;

        const correctCharacters = document.querySelector("span.correctCharacters");
        const incorrectCharacters = document.querySelector("span.incorrectCharacters");
        const totalGuesses = document.querySelector("span.totalGuesses");
        const input = document.querySelector("input.submitWord");
        const completed = document.querySelector("span.completed");
        const answerDiv = document.querySelector("div.answerContainer");
        
        // Adding colour classes to the correct/incorrect letters
        (input.value.split("")).forEach((letter, index) => {
            let span = document.createElement("span");
            span.classList.add("letter");
            if (word.correctCharacterPlacements[index] === letter) {
                span.classList.add("correctCharacterPlacement");
            }
            if (word.correctCharacters.includes(letter)) {
                span.classList.add("correctCharacter");
            } else if (word.incorrectCharacters.includes(letter)) {
                span.classList.add("incorrectCharacter");
            }
            span.appendChild(document.createTextNode(letter));
            div.appendChild(span);
            answerDiv.appendChild(div);
        }) 

        document.querySelector("input.submitWord").value = "";
        completed.innerHTML = "";
        correctCharacters.innerHTML = "Correct Characters: "
        incorrectCharacters.innerHTML = "Incorrect Characters: "
        Object.values(word.correctCharacters).forEach(letter => {
            correctCharacters.innerHTML += letter + " ";
        })
        Object.values(word.incorrectCharacters).forEach(letter => {
            incorrectCharacters.innerHTML += letter + " ";
        })
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