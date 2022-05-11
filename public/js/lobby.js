//TODO make lobbies have there on thing in a db with a few vals and get delete once a game is done
// lobbies should have a val for is full? one for each player a start time a score maybe
(function () {
  let playerId;
  let playerNum;
  let playerRef;
  let lobbyRef;
  let allPlayersRef;
  let gamStarted = false;
  let lobbyId = window.location.pathname.split("/")[2];
  let keyCount = 1;
  let userGuessCount = 1;

  function startNewWordle() {
    playerRef.update({
      currentWordle: createWordle()
    })
    document.querySelectorAll("div.letter_slots").forEach(slot => {
      slot.innerHTML = "";
      slot.classList.remove("correctCharacter", "correctCharacterPlacement", "incorrectCharacter");
    })
    document.querySelectorAll("div.key").forEach(element => {
      element.classList.remove("green", "yellow", "black");
    });
    keyCount = 1;
    userGuessCount = 1;
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
    // if the key pressed is a letter, add it to a div 
    if (event.key.length === 1 && event.key.match(/[a-z]/i) && keyCount < 6) {
      let div = document.querySelector(`div.bar_${userGuessCount} > div.slot_${keyCount}`);
      div.innerHTML += event.key.toUpperCase();
      keyCount++;
    }
    // if the key pressed is enter, submit the wordle
    if (event.key.toLowerCase() === "enter" && keyCount === 6) {
      let wordArray = [];
      for (let i = 0; i < 5; i++) {
        wordArray.push(document.querySelector("div.bar_" + userGuessCount).children[i].innerHTML)
      }
      let wordGuess = wordArray.join("").toLowerCase();
      guessWord(wordGuess).then((word) => {
        word.correctCharacters = Array.from(word.correctCharacters);
        word.incorrectCharacters = Array.from(word.incorrectCharacters);

        (wordGuess.split("")).forEach((letter, index) => {
          if (word.correctCharacterPlacements[index] === letter) {
            document.querySelector(`div.bar_${userGuessCount - 1} > div.slot_${index + 1}`).classList.add("correctCharacterPlacement");
            document.querySelector(`#${letter}`).classList.add("green");
          }
          else if (word.correctCharacters.includes(letter)) {
            document.querySelector(`div.bar_${userGuessCount - 1} > div.slot_${index + 1}`).classList.add("correctCharacter");
            document.querySelector(`#${letter}`).classList.add("yellow");
          } else if (word.incorrectCharacters.includes(letter)) {
            document.querySelector(`div.bar_${userGuessCount - 1} > div.slot_${index + 1}`).classList.add("incorrectCharacter");
            document.querySelector(`#${letter}`).classList.add("black");
          }
        })

        //TODO MOVE TO BACKEND BIG CHEATS
        if (word.completed) {
          playerRef.get().then((snapshot) => {
            let player = snapshot.val()
            playerRef.update({
              score: player.score + 1
            })
          })
          startNewWordle();
        }
        if (word.totalGuesses === 6 && !word.completed) {
          playerRef.get().then((snapshot) => {
            let player = snapshot.val()
            playerRef.update({
              score: player.score - 1
            })
          })
          startNewWordle();
        }
      });
      keyCount = 1;
      userGuessCount++;
    }
    // if the key pressed is backspace, remove the last letter
    if (event.key.toLowerCase() === "backspace") {
      let div = document.querySelector(`div.bar_${userGuessCount} > div.slot_${keyCount - 1}`);
      div.innerHTML = div.innerHTML.slice(0, -1);
      keyCount--;
    }
  })

  document.querySelector(".keyboard").addEventListener("click", event => {
    event.preventDefault();
    if (event.target.classList.contains("letter")) {
      let div = document.querySelector(`div.bar_${userGuessCount} > div.slot_${keyCount}`);
      div.innerHTML += event.target.innerHTML;
      keyCount++;
    }
    else if (event.target.classList.contains("del")) {
      let div = document.querySelector(`div.bar_${userGuessCount} > div.slot_${keyCount - 1}`);
      div.innerHTML = div.innerHTML.slice(0, -1);
      keyCount--;
    }
    else if (event.target.classList.contains("ent")) {
      let wordArray = [];
      for (let i = 0; i < 5; i++) {
        wordArray.push(document.querySelector("div.bar_" + userGuessCount).children[i].innerHTML)
      }
      let wordGuess = wordArray.join("").toLowerCase();
      guessWord(wordGuess).then((word) => {
        word.correctCharacters = Array.from(word.correctCharacters);
        word.incorrectCharacters = Array.from(word.incorrectCharacters);

        (wordGuess.split("")).forEach((letter, index) => {
          if (word.correctCharacterPlacements[index] === letter) {
            document.querySelector(`div.bar_${userGuessCount - 1} > div.slot_${index + 1}`).classList.add("correctCharacterPlacement");
            document.querySelector(`#${letter}`).classList.add("green");
          }
          else if (word.correctCharacters.includes(letter)) {
            document.querySelector(`div.bar_${userGuessCount - 1} > div.slot_${index + 1}`).classList.add("correctCharacter");
            document.querySelector(`#${letter}`).classList.add("yellow");
          } else if (word.incorrectCharacters.includes(letter)) {
            document.querySelector(`div.bar_${userGuessCount - 1} > div.slot_${index + 1}`).classList.add("incorrectCharacter");
            document.querySelector(`#${letter}`).classList.add("black");
          }
        })

        //TODO MOVE TO BACKEND BIG CHEATS
        if (word.completed) {
          playerRef.get().then((snapshot) => {
            let player = snapshot.val()
            playerRef.update({
              score: player.score + 1
            })
          })
          startNewWordle();
        }
        if (word.totalGuesses === 6 && !word.completed) {
          playerRef.get().then((snapshot) => {
            let player = snapshot.val()
            playerRef.update({
              score: player.score - 1
            })
          })
          startNewWordle();
        }
      });
      keyCount = 1;
      userGuessCount++;
    }
  })

  function initGame() {
    allPlayersRef.on("child_changed", (snapshot) => {
      allPlayersRef.get().then((snapshot2) => {
        let allPlayers = snapshot2.val() || {};
        Object.values(allPlayers).forEach((player) => {
          document.querySelector(`.player${player.num}_score`).innerHTML = player.score;
        })
      })
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
      document.querySelector(".wordle_bars").style = "justify-content: center; align-items: center; height: 100%; color: black; display: flex; font-size: 40px;"
      document.querySelector(".wordle_bars").innerHTML = "Opponent Disconnected!"
    })
  }

  function startGame() {
    const timerElement = document.getElementById("timer");
    const cd = 10;
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
          let scores = {};
          Object.values(allPlayers).forEach((player) => {
            document.querySelector(`.player${player.num}_score`).innerHTML = player.score;
            scores[player.num] = player.score;
          })
          let keysSorted = Object.keys(scores).sort(function (a, b) { return scores[b] - scores[a] })
          document.querySelector(".wordle_bars").style = "justify-content: center; align-items: center; height: 100%; color: black; display: flex; font-size: 40px;"

          if (scores[keysSorted[0]] === scores[keysSorted[1]]) {
            document.querySelector(".wordle_bars").innerHTML = "Draw!"
          } else if (keysSorted[0] === playerNum.toString()) {
            document.querySelector(".wordle_bars").innerHTML = "You Win!"
          } else {
            document.querySelector(".wordle_bars").innerHTML = "You Lose!"
          }
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
        playerNum = Object.entries(allPlayers).length
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