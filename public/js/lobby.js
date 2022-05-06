//TODO make lobbies have there on thing in a db with a few vals and get delete once a game is done
// lobbies should have a val for is full? one for each player a start time a score maybe
(function () {
  let playerId;
  let playerRef;
  let lobbyRef;
  let allPlayersRef;
  let gamStarted = false;
  let lobbyId = window.location.pathname.split("/")[2];

  function startNewWordle() {
    playerRef.update({
      currentWordle: createWordle()
    })
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

  function guessWord(word) {
    return new Promise((resolve, reject) => {

      let currentWordleRef = firebase.database().ref(`lobbies/${lobbyId}/players/${playerId}/currentWordle`);
      currentWordleRef.get().then((snapshot) => {
        let wordleSnapshot = snapshot.val()
        if (!wordleSnapshot.correctCharacters) wordleSnapshot.correctCharacters = [];
        if (!wordleSnapshot.incorrectCharacters) wordleSnapshot.incorrectCharacters = [];

        wordleSnapshot.correctCharacters = new Set(wordleSnapshot.correctCharacters);
        wordleSnapshot.incorrectCharacters = new Set(wordleSnapshot.incorrectCharacters);

        wordleSnapshot.totalGuesses++
        if (word === wordleSnapshot.answer) {
          wordleSnapshot.completed = true
        }

        word.split("").forEach((letter, index) => {
          if (!wordleSnapshot.answer.includes(letter)) {
            wordleSnapshot.incorrectCharacters.add(letter);
            return;
          }

          wordleSnapshot.correctCharacters.add(letter);
          if (word[index] === wordleSnapshot.answer[index]) {
            wordleSnapshot.correctCharacterPlacements[index] = letter
          }
        })

        wordleSnapshot.correctCharacters = Array.from(wordleSnapshot.correctCharacters);
        wordleSnapshot.incorrectCharacters = Array.from(wordleSnapshot.incorrectCharacters);

        currentWordleRef.update(wordleSnapshot).then(resolve(wordleSnapshot))
      })
    })
  }

  // document.querySelector("button").addEventListener("click", event => {
  //   event.preventDefault();

  //   const inputWord = document.querySelector("input.submitWord").value.toLowerCase()
  //   if (inputWord.length === 5) {
  //     guessWord(inputWord).then((word) => {
  //       word.correctCharacters = Array.from(word.correctCharacters);
  //       word.incorrectCharacters = Array.from(word.incorrectCharacters);
  //       console.log(word)

  //       let div = document.createElement("div");
  //       const correctCharacters = document.querySelector("span.correctCharacters");
  //       const incorrectCharacters = document.querySelector("span.incorrectCharacters");
  //       const totalGuesses = document.querySelector("span.totalGuesses");
  //       const input = document.querySelector("input.submitWord");
  //       const completed = document.querySelector("span.completed");
  //       const answerDiv = document.querySelector("div.answerContainer");

  //       // Adding color classes to the correct/incorrect letters
  //       (input.value.toLowerCase().split("")).forEach((letter, index) => {
  //         let span = document.createElement("span");
  //         span.classList.add("letter");
  //         if (word.correctCharacterPlacements[index] === letter) {
  //           span.classList.add("correctCharacterPlacement");
  //           document.querySelector(`#${letter}`).classList.add("green");
  //         }
  //         else if (word.correctCharacters.includes(letter)) {
  //           span.classList.add("correctCharacter");
  //           document.querySelector(`#${letter}`).classList.add("yellow");
  //         } else if (word.incorrectCharacters.includes(letter)) {
  //           span.classList.add("incorrectCharacter");
  //           document.querySelector(`#${letter}`).classList.add("black");
  //         }
  //         div.classList.add("wordleContainer");
  //         span.appendChild(document.createTextNode(letter));
  //         div.appendChild(span);
  //         answerDiv.appendChild(div);
  //       })

  //       document.querySelector("input.submitWord").value = "";
  //       completed.innerHTML = "";
  //       correctCharacters.innerHTML = "Correct Characters: "
  //       incorrectCharacters.innerHTML = "Incorrect Characters: "
  //       Object.values(word.correctCharacters).forEach(letter => {
  //         correctCharacters.innerHTML += letter + " ";
  //       })
  //       Object.values(word.incorrectCharacters).forEach(letter => {
  //         incorrectCharacters.innerHTML += letter + " ";
  //       })
  //       totalGuesses.innerHTML = "Total guesses: " + word.totalGuesses;

  //       //TODO MOVE TO BACKEND BIG CHEATS
  //       if (word.completed) {
  //         completed.innerHTML = `correct! The word was ${word.correctCharacterPlacements.join("")}`;
  //         playerRef.get().then((snapshot) => {
  //           let player = snapshot.val()
  //           playerRef.update({
  //             score: player.score + 1
  //           })
  //         })

  //         startNewWordle();
  //       }
  //       if (word.totalGuesses === 5 && !word.completed) {
  //         playerRef.get().then((snapshot) => {
  //           let player = snapshot.val()
  //           playerRef.update({
  //             score: player.score - 1
  //           })
  //         })
  //         completed.innerHTML = `Too many incorrect guesses! Start a new game!`;
  //         startNewWordle();
  //       }
  //     });
  //   }
  // })

  function initGame() {
    allPlayersRef.on("child_changed", (snapshot) => {
      
      //On new player
      const addedPlayer = snapshot.val();
      if (addedPlayer.num === 2 && !gamStarted) {
        document.querySelector(`.player${addedPlayer.num}_username`).innerHTML = `Them`;
        gamStarted = true;
        startGame();
      }
    })

    allPlayersRef.on("child_removed", (snapshot) => {
      const removedKey = snapshot.val().id;
      document.querySelector(".container").style = "  justify-content: center; align-items: center; height: 100%; color: black;"
      document.querySelector(".container").innerHTML = "Opponent Disconnected!"
    })
  }

  function startGame() {
    const timerElement = document.getElementById("timer");
    const cd = 5;
    const time = (1 * 60) + cd;
    let timer = time;
    let timerID;
    let started = false;

    function secondsToMS(d) {
      d = Number(d);
      var m = Math.floor(d % 3600 / 60);
      var s = Math.floor(d % 3600 % 60);

      var mDisplay = m > 0 ? (m < 10 ? `${m}` : m) : "0";
      var sDisplay = s > 0 ? (s < 10 ? `0${s}` : s) : "00";
      return `${mDisplay}:${sDisplay}`;
    }

    timerID = setInterval(() => {
      if (timer > 0) {
        timer--;
        if (!started && timer <= time - cd) {
          started = true;
          document.querySelector(".wordle_bars").style = "display: block;";
          document.querySelector(".keyboard").style = "display: block;";
        }

        timerElement.innerHTML = secondsToMS(timer)
      }
      if (timer <= 0) {
        clearInterval(timerID)
        timerElement.innerHTML = "Done!"
        timerElement.style = "font-size: 21px; left: 516px;"
        document.querySelector(".wordle_bars").style = "display: none;";
        document.querySelector(".keyboard").style = "display: none;";

        allPlayersRef.get().then((snapshot) => {
          let allPlayers = snapshot.val() || {};
          Object.values(allPlayers).forEach((player) => {
            document.querySelector(`.player${player.num}_score`).innerHTML = player.score;
          })
        })
      }
    }, 1000);
  }

  //Login/Logout
  firebase.auth().onAuthStateChanged((user) => {
    // console.log(user)
    if (user) {
      //LOGGED IN
      playerId = user.uid;
      lobbyRef = firebase.database().ref(`lobbies/${lobbyId}`);
      allPlayersRef = firebase.database().ref(`lobbies/${lobbyId}/players`);
      playerRef = firebase.database().ref(`lobbies/${lobbyId}/players/${playerId}`);

      lobbyRef.update({
        id: lobbyId
      })

      playerRef.set({
        id: playerId,
        score: 0,
        currentWordle: createWordle()
      })

      allPlayersRef.get().then((snapshot) => {
        let allPlayers = snapshot.val() || {};
        let playerNum = Object.entries(allPlayers).length
        playerRef.update({
          num: playerNum
        })

        document.querySelector(`.player${playerNum}_username`).innerHTML = `Me`;
        document.querySelector(`.player${playerNum}_username`).style = "color: red;"
        if (playerNum !== 1) document.querySelector(`.player1_username`).innerHTML = `Them`;
      })

      playerRef.onDisconnect().remove();
      lobbyRef.onDisconnect().remove();

      initGame();
    }
  })

  //Error
  firebase.auth().signInAnonymously().catch((error) => {
    console.log(error.code, error.message)
  })
})();