//TODO make lobbies have there on thing in a db with a few vals and get delete once a game is done
// lobbies should have a val for is full? one for each player a start time a score maybe
(function () {
  let playerId;
  let playerRef;
  let lobbyRef;
  let allPlayersRef;
  let currentWordleRef;
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

      currentWordleRef = firebase.database().ref(`lobbies/${lobbyId}/players/${playerId}/currentWordle`);
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
    // // if the key pressed is enter, submit the wordle
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
      document.querySelector("button.submitWordle").click();
    }
  })

  function initGame() {
    //for lobbies `lobbies/${lobbyId}`

    // currentWordleRef.on("value", (snapshot) => {
    //   wordle = snapshot.val() || {};
    // })

    // allPlayersRef.on("value", (snapshot) => {
    //   //On change
    //   players = snapshot.val() || {};
    //   Object.keys(players).forEach((key) => {
    //     const playerState = players[key];
    //   })


    // })

    // allPlayersRef.on("child_node", (snapshot) => {
    //   //On new player
    //   const addedPlayer = snapshot.val();
    //   if (Object.keys(players).length >= 2) {
    //     //do something lobby is full
    //     document.querySelector(".container").innerHTML = "Sorry there are already 2 players in this game."
    //   } else if (addedPlayer.id !== playerId) {
    //     startGame();
    //   }
    // })

    // allPlayersRef.on("child_removed", (snapshot) => {
    //   const removedKey = snapshot.val().id;
    //   document.querySelector(".container").innerHTML = "Opponent Disconnected!"
    //   delete players[removedKey]
    // })
  }

  // function startGame() {
  //   lobbyRef.set({
  //     startTime: Date.now()
  //   })

  //   let timer = 60;
  //   let timerID;

  //   // add code here to insert the game screen into the lobby cause no ejs
  //   //have the lobby.ejs to lobby.html file to just be a blank page with Wating for player...
  //   timerID = setInterval(() => {
  //     if (timer > 0) {
  //       timer--;
  //       document.getElementById("timer").innerHTML = `Time remaining: ${timer} seconds`;
  //     }
  //     if (timer <= 0) {
  //       clearInterval(timerID)
  //       document.getElementById("timer").innerHTML = "";
  //       document.querySelector(".container").innerHTML = "Done!"
  //     }
  //   }, 1000);
  //   startNewWordle()
  // }

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
        let playerNum = Object.entries(snapshot.val()).length
        playerRef.update({
          num: playerNum
        })
        // document.getElementById("playernum").innerHTML = playerNum;
      })

      playerRef.onDisconnect().remove();

      initGame();
    }
  })

  //Error
  firebase.auth().signInAnonymously().catch((error) => {
    console.log(error.code, error.message)
  })
})();