function startNewGame() {
    document.querySelector("span.correctCharacters").innerHTML = "Correct Characters: "
    document.querySelector("span.incorrectCharacters").innerHTML = "Incorrect Characters: "
    document.querySelector("span.totalGuesses").innerHTML = "Total guesses: 0";
    document.querySelectorAll("span.letter").forEach(element => {
        element.remove();
    });
    document.querySelectorAll("div.key").forEach(element => {
        element.classList.remove("green", "yellow", "black");
    });
}

document.querySelector("button").addEventListener("click", event => {
    event.preventDefault();
    axios.post("/api/v1/lobby", {
        word: document.querySelector("input.submitWord").value.toLowerCase(),
        id: window.location.pathname.split("/")[2]
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
        if (input.value.length === 5) {
            (input.value.toLowerCase().split("")).forEach((letter, index) => {
                let span = document.createElement("span");
                span.classList.add("letter");
                if (word.correctCharacterPlacements[index] === letter) {
                    span.classList.add("correctCharacterPlacement");
                    document.querySelector(`#${letter}`).classList.add("green");
                }
                else if (word.correctCharacters.includes(letter)) {
                    span.classList.add("correctCharacter");
                    document.querySelector(`#${letter}`).classList.add("yellow");
                } else if (word.incorrectCharacters.includes(letter)) {
                    span.classList.add("incorrectCharacter");
                    document.querySelector(`#${letter}`).classList.add("black");
                }
                div.classList.add("wordleContainer");
                span.appendChild(document.createTextNode(letter));
                div.appendChild(span);
                answerDiv.appendChild(div);
            }) 
        }

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
                word,
                id: window.location.pathname.split("/")[2]
            })
            completed.innerHTML = `correct! The word was ${word.correctCharacterPlacements.join("")}`;
            startNewGame();
            
        }
        if (word.totalGuesses == 5 && !word.completed) {
            axios.post("/api/v1/lobbyLose", {
                word,
                id: window.location.pathname.split("/")[2]
            })
            completed.innerHTML = `Too many incorrect guesses! Start a new game!`;
            startNewGame();
        }
    })
    .catch(error => {
        console.log(error)
    })
})

document.querySelector(".keyboard").addEventListener("click", event => {
    event.preventDefault();
    if (event.target.classList.contains("letter")) {
        document.querySelector("input.submitWord").value += event.target.innerHTML;
    }
    else if (event.target.classList.contains("del")) {
        document.querySelector("input.submitWord").value = document.querySelector("input.submitWord").value.slice(0, -1);
    }
    else if (event.target.classList.contains("ent")) {
        document.querySelector("button.submitWordle").click();
    }
})

// Change keys on press

const allKeys = [..."abcdefghijklmnopqrstuvwxyz", "enter", "backspace"]

document.addEventListener("keydown", function (event) {
    const keyPressed = event.key.toLowerCase();
    if (allKeys.includes(event.key.toLowerCase())) {
        const key = document.querySelector("#" + keyPressed);
        key.classList.add("pressed");
        key.children[0].classList.add("pressed")
    }
})

document.addEventListener("keyup", function (event) {
    const keyPressed = event.key.toLowerCase();
    if (allKeys.includes(event.key.toLowerCase())) {
        const key = document.querySelector("#" + keyPressed);
        key.classList.remove("pressed");
        key.children[0].classList.remove("pressed")
    }
})

startNewGame()