(function () {
  let playerId;
  let playerNum;
  let playerRef;
  let lobbyRef;
  let allPlayersRef;
  let gameStarted = false;
  let lobbyId = window.location.pathname.split("/")[2];
  let keyCount = 1;
  let userGuessCount = 1;
  const hpWidth = 338 / 100;
  const playerUnlockedChars = ["catchu", "dogchu", "turtlechu"];


  document.addEventListener("click", event => {
    event.preventDefault();

    if (event.target.classList.contains("abilityButton")) {
      let cd = document.querySelector(".abilityCooldown");
      let butt = document.querySelector(".abilityButton");
      let abi = document.querySelector(".ability");
      let int = 0;
      let i = 0;

      const time = 30;
      let timer = time;
      let timerID;
      switch (gotchu) {
        case "catchu":
          let randID = setInterval(function () {
            i++
            int >= 6 ? int = 1 : int++
            abi.innerHTML = `(${int}) Damage done to <br>your opponent!`;
            if (i > Math.floor(Math.random() * 50) + 10) {
              clearTimeout(randID);
              allPlayersRef.get().then((snapshot) => {
                let players = snapshot.val()
                Object.values(players).forEach((player) => {
                  if (playerNum !== player.num) {
                    let otherPlayerRef = firebase.database().ref(`lobbies/${lobbyId}/players/${player.id}`);

                    //end game condition
                    if (player.hp - 25 <= 0) {

                    }

                    otherPlayerRef.update({
                      hp: player.hp - int
                    })
                  }
                })
              })
            }
          }, 60);

          break;
        case "dogchu":
          let currentWordleRef = firebase.database().ref(`lobbies/${lobbyId}/players/${playerId}/currentWordle`);
          currentWordleRef.get().then((snapshot) => {
            let wordleSnapshot = snapshot.val()
            let randLetter = wordleSnapshot.answer[Math.floor(Math.random() * 5) + 1];
            abi.innerHTML = `(${randLetter.toUpperCase()}) is one of the <br>letters in your word!`;

          })
          break;
        case "turtlechu":
          playerRef.get().then((snapshot) => {
            let player = snapshot.val()
            playerRef.update({
              hp: player.hp + 5
            })
          })
          abi.innerHTML = `(${5}) HP gained!`;
          break;
        case "mousechu":

          break;
        case "raccoonchu":

          break;

        default:
          break;
      }

      butt.style = "display: none;"
      cd.innerHTML = timer;
      timerID = setInterval(() => {
        timer--
        if (timer > 0) {
          cd.innerHTML = timer;
        }
        if (timer <= 0) {
          clearInterval(timerID)
          butt.style = ""
          cd.innerHTML = "Ready!";
        }
      }, 1000)
    }
  })

  function startNewWordle() {
    playerRef.update({
      currentWordle: createWordle()
    })
    document.querySelectorAll("div.letterSlots").forEach(slot => {
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

  function submitWordle() {
    let wordArray = [];
    for (let i = 0; i < 5; i++) {
      wordArray.push(document.querySelector("div.bar" + userGuessCount).children[i].innerHTML)
    }
    let wordGuess = wordArray.join("").toLowerCase();
    if (!words.includes(wordGuess)) {
      sfx.errorSound.play();
      for (let i = 0; i < 5; i++) {
        document.querySelector(`div.bar${userGuessCount} > div.slot${i + 1}`).classList.toggle("error");
      }
      setTimeout(() => {
        for (let i = 0; i < 5; i++) {
          document.querySelector(`div.bar${userGuessCount} > div.slot${i + 1}`).classList.toggle("error");
        }
      }, 300);
      return;
    }
    guessWord(wordGuess).then((word) => {
      word.correctCharacters = Array.from(word.correctCharacters);
      word.incorrectCharacters = Array.from(word.incorrectCharacters);
      sfx.sendWordle.play();
      (wordGuess.split("")).forEach((letter, index) => {
        if (word.correctCharacterPlacements[index] === letter) {
          document.querySelector(`div.bar${userGuessCount - 1} > div.slot${index + 1}`).classList.add("correctCharacterPlacement");
          document.querySelector(`#${letter}`).classList.add("green");
        }
        else if (word.correctCharacters.includes(letter)) {
          document.querySelector(`div.bar${userGuessCount - 1} > div.slot${index + 1}`).classList.add("correctCharacter");
          document.querySelector(`#${letter}`).classList.add("yellow");
        } else if (word.incorrectCharacters.includes(letter)) {
          document.querySelector(`div.bar${userGuessCount - 1} > div.slot${index + 1}`).classList.add("incorrectCharacter");
          document.querySelector(`#${letter}`).classList.add("black");
        }
      })

      //TODO MOVE TO BACKEND BIG CHEATS
      if (word.completed) {
        sfx.successfulWordle.play();
        allPlayersRef.get().then((snapshot) => {
          let players = snapshot.val()
          Object.values(players).forEach((player) => {
            if (playerNum !== player.num) {
              let otherPlayerRef = firebase.database().ref(`lobbies/${lobbyId}/players/${player.id}`);
              document.querySelector(`.player${player.num}Character`).innerHTML = `<div class=${player.gotchu}Sad></div>`;
              if (player.num === 1) {
                document.querySelector(`.player${player.num}Character`).classList.toggle("attackedP1");
              } else {
                document.querySelector(`.player${player.num}Character`).classList.toggle("attackedP2");
              }
              setTimeout(() => {
                if (player.num === 1) {
                  document.querySelector(`.player${player.num}Character`).classList.toggle("attackedP1");
                } else {
                  document.querySelector(`.player${player.num}Character`).classList.toggle("attackedP2");
                }
                document.querySelector(`.player${player.num}Character`).innerHTML = `<div class=${player.gotchu}></div>`;
              }, 600)
              //end game condition
              if (player.hp - 25 <= 0) {

              }

              otherPlayerRef.update({
                hp: player.hp - 25
              })
            }
          })
        })
        setTimeout(() => {
          startNewWordle();
        }, 1000)
      }
      if (word.totalGuesses === 6 && !word.completed) {
        allPlayersRef.get().then((snapshot) => {
          let players = snapshot.val()
          Object.values(players).forEach((player) => {
            if (playerNum !== player.num) {
              let otherPlayerRef = firebase.database().ref(`lobbies/${lobbyId}/players/${player.id}`);
              document.querySelector(`.player${player.num}Character`).innerHTML = `<div class=${player.gotchu}Sad></div>`;
              if (player.num === 1) {
                document.querySelector(`.player${player.num}Character`).classList.toggle("attackedP1");
              } else {
                document.querySelector(`.player${player.num}Character`).classList.toggle("attackedP2");
              }

              setTimeout(() => {
                if (player.num === 1) {
                  document.querySelector(`.player${player.num}Character`).classList.toggle("attackedP1");
                } else {
                  document.querySelector(`.player${player.num}Character`).classList.toggle("attackedP2");
                }
                document.querySelector(`.player${player.num}Character`).innerHTML = `<div class=${player.gotchu}></div>`;
              }, 600)
              //end game condition
              if (player.hp - 25 <= 0) {

              }

              otherPlayerRef.update({
                hp: player.hp - (word.correctCharacters.length + word.correctCharacterPlacements.reduce((total, curr) => (curr !== "_") ? total + 2 : total + 0, 0))
              })
            }
          })
        })
        startNewWordle();
      }
    });
    keyCount = 1;
    userGuessCount++;
  }

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
      let div = document.querySelector(`div.bar${userGuessCount} > div.slot${keyCount}`);
      sfx.enterLetter.play();
      div.innerHTML += event.key.toUpperCase();
      keyCount++;
    }
    // if the key pressed is enter, submit the wordle
    if (event.key.toLowerCase() === "enter" && keyCount === 6) {
      submitWordle();
    }
    // if the key pressed is backspace, remove the last letter
    if (event.key.toLowerCase() === "backspace" && keyCount > 1) {
      let div = document.querySelector(`div.bar${userGuessCount} > div.slot${keyCount - 1}`);
      sfx.removeLetter.play();
      div.innerHTML = div.innerHTML.slice(0, -1);
      keyCount--;
    }
  })

  document.querySelector(".keyboard").addEventListener("click", event => {
    event.preventDefault();
    if (event.target.classList.contains("letter")) {
      let div = document.querySelector(`div.bar${userGuessCount} > div.slot${keyCount}`);
      sfx.enterLetter.play();
      div.innerHTML += event.target.innerHTML;
      keyCount++;
    }
    else if (event.target.classList.contains("del") && keyCount > 1) {
      let div = document.querySelector(`div.bar${userGuessCount} > div.slot${keyCount - 1}`);
      sfx.removeLetter.play();
      div.innerHTML = div.innerHTML.slice(0, -1);
      keyCount--;
    }
    else if (event.target.classList.contains("ent") && keyCount === 6) {
      submitWordle();
    }
  })

  function initGame() {
    allPlayersRef.on("child_changed", (snapshot) => {
      allPlayersRef.get().then((snapshot2) => {
        let allPlayers = snapshot2.val() || {};
        Object.values(allPlayers).forEach((player) => {
          document.querySelector(`.player${player.num}Score`).innerHTML = player.hp;
          document.querySelector(`.player${player.num}Healthbar`).style = `background-position-x: ${-6439 + (((player.num === 1) ? player.hp - 100 : 100 - player.hp) * hpWidth)}px;`;

        })
      })
      //On new player
      const addedPlayer = snapshot.val();
      if (addedPlayer.num === 2 && !gameStarted) {
        document.querySelector(`.player${addedPlayer.num}Username`).innerHTML = addedPlayer.name || "Guest";
        document.querySelector(`.player${addedPlayer.num}Character`).innerHTML = `<div class=${addedPlayer.gotchu}></div>`;
        document.querySelector(`.player${addedPlayer.num}Icon`).innerHTML = `<div class=${addedPlayer.gotchu}Icon></div>`
        gameStarted = true;
        startGame();
      }
    })

    allPlayersRef.on("child_removed", (snapshot) => {
      const removedKey = snapshot.val().id;
      document.querySelector(".wordleBars").style = "justify-content: center; align-items: center; height: 100%; color: black; display: flex; font-size: 40px;"
      document.querySelector(".wordleBars").innerHTML = "Opponent Disconnected!"
      document.querySelector(".keyboard").style = "display: none;"
      setTimeout(() => {window.location.href = "/user"}, 5000);
    })
  }

  function startGame() {
    playerRef.update({
      ready: false,
      currentWordle: createWordle()
    })

    const timerElement = document.getElementById("timer");
    const cd = 10;
    const time = (2 * 60) + cd;
    let timer = time;
    let timerID;
    let started = false;

    music.battleMusic.play();
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
          document.querySelector(".wordleBars").style = "display: block;";
          document.querySelector(".keyboard").style = "display: block;";
        }

        timerElement.innerHTML = secondsToMS(timer)
      }
      if (timer <= 0) {
        clearInterval(timerID)
        timerElement.innerHTML = "Done!"
        timerElement.style = "font-size: 21px; left: 516px;"
        document.querySelector(".wordleBars").style = "display: none;";
        document.querySelector(".keyboard").style = "display: none;";

        allPlayersRef.get().then((snapshot) => {
          let allPlayers = snapshot.val() || {};
          let hps = {};
          Object.values(allPlayers).forEach((player) => {
            document.querySelector(`.player${player.num}Score`).innerHTML = player.hp;
            hps[player.num] = player.hp;
          })
          let keysSorted = Object.keys(hps).sort(function (a, b) { return hps[b] - hps[a] })
          // document.querySelector(".wordleBars").style = "justify-content: center; align-items: center; height: 100%; color: black; display: flex; font-size: 40px;"

          if (hps[keysSorted[0]] === hps[keysSorted[1]]) {
            document.querySelector(".wordleBars").innerHTML = "Draw!"
          } else if (keysSorted[0] === playerNum.toString()) {
            window.location.href = `/lobby/${lobbyId}/${gotchu}/win`
          } else {
            window.location.href = `/lobby/${lobbyId}/${gotchu}/lose`
          }
        })
      }
    }, 1000);
  }
  // Settings event listeners

  /** Sound variables
   * @param {boolean} - let fxState
   * @param {boolean} - let musicState
   */

  window.addEventListener("click", (event) => {
    const targetClasslist = event.target.className.split(" ");
    if (targetClasslist.includes("settingsButton")) {

      const existingSettingsContainer = document.querySelector(".settingsContainer");
      if (existingSettingsContainer) return existingSettingsContainer.remove();

      const mainScreen = document.querySelector("body");
      const settingsContainer = document.createElement("div");
      settingsContainer.className = "settingsContainer";
      settingsContainer.innerHTML = `
            <h1>SETTINGS</h1>
            <div class="soundSettingsRow">
              <p>SOUND EFFECTS</p>
              <div class="onOffToggleButton"><h3></h3></div>
            </div>
            <div class="musicSettingsRow">
              <p>MUSIC</p>
              <div class="onOffToggleButton"><h3></h3></div>
            </div>
            <div class="closeSettingsContainer">
              <div class="logoutButton">
                <h4>LOG OUT</h4>
              </div>
              <div class="closeSettingsButton">
                <h4>CLOSE</h4>
              </div>
            </div>
          `;
      mainScreen.appendChild(settingsContainer);

      // Add button text
      const fxToggle = document.querySelector(".soundSettingsRow .onOffToggleButton h3");
      const musicToggle = document.querySelector(".musicSettingsRow .onOffToggleButton h3");

      if (fxState) {
        fxToggle.innerText = "ON";
      } else {
        fxToggle.innerText = "OFF";
      }

      if (musicState) {
        musicToggle.innerText = "ON";
      } else {
        musicToggle.innerText = "OFF";
      }

      // On off toggles for sound
      // Need to change later, temp solution
      document.querySelector(".soundSettingsRow .onOffToggleButton h3").addEventListener("click", (event) => {
        if (event.target.innerHTML === "ON") {
          event.target.innerHTML = "OFF";
          fxState = false;
          sfx.mute(true);
        } else {
          event.target.innerHTML = "ON";
          fxState = true;
          sfx.mute(false);
        }
      })

      document.querySelector(".musicSettingsRow .onOffToggleButton h3").addEventListener("click", (event) => {
        if (event.target.innerHTML === "ON") {
          event.target.innerHTML = "OFF";
          musicState = false;
          music.battleMusic.mute(true);
        } else {
          event.target.innerHTML = "ON";
          musicState = true;
          music.battleMusic.mute(false);
        }
      })
    }

    if (targetClasslist.includes("onOffToggleButton")) {
      const onOffToggleButton = event.target;
      const onOffToggleButtonText = onOffToggleButton.querySelector("h3");
      if (onOffToggleButtonText.innerText === "ON") {
        onOffToggleButtonText.innerText = "OFF";
        if (onOffToggleButton.parentElement.className == "soundSettingsRow") {
          fxState = false;
          sfx.mute(true);
        } else {
          musicState = false;
          music.battleMusic.mute(true);
        }

      } else {
        onOffToggleButtonText.innerText = "ON";
        if (onOffToggleButton.parentElement.className == "soundSettingsRow") {
          fxState = true;
          sfx.mute(false);
        } else {
          musicState = true;
          music.battleMusic.mute(false);
        }
      }
    }

    if (targetClasslist.includes("closeSettingsButton")) {
      const settingsContainer = document.querySelector(".settingsContainer");
      settingsContainer.remove();
    }
  })

  //Login/Logout
  firebase.auth().onAuthStateChanged((user) => {
    // console.log(user)
    if (user) {
      //LOGGED IN
      playerId = user.uid;
      lobbyRef = firebase.database().ref(`lobbies/${lobbyId}`);
      allPlayersRef = firebase.database().ref(`lobbies/${lobbyId}/players`);
      playerRef = firebase.database().ref(`lobbies/${lobbyId}/players/${playerId}`);

      allPlayersRef.get().then((snapshot) => {
        let allPlayers = snapshot.val() || {};
        if (Object.keys(allPlayers).length === 2) {
          document.querySelector(".wordleBars").style = "justify-content: center; align-items: center; height: 100%; color: black; display: flex; font-size: 40px;"
          document.querySelector(".wordleBars").innerHTML = "Lobby already has 2 players!"
          throw "Lobby already has 2 players!"
        }
        if (playerUnlockedChars.indexOf(gotchu) === -1) {
          document.querySelector(".wordleBars").style = "justify-content: center; align-items: center; height: 100%; color: black; display: flex; font-size: 40px;"
          document.querySelector(".wordleBars").innerHTML = "Invalid Gotchu!"
          throw "Invalid Gotchu!"
        }
      }).then(() => {
        initGame();
        lobbyRef.update({
          id: lobbyId
        })

        playerRef.set({
          name: user.displayName || "Guest",
          id: playerId,
          gotchu,
          hp: 100,
          ready: false
        })

        allPlayersRef.get().then((snapshot) => {
          let allPlayers = snapshot.val() || {};

          playerNum = Object.entries(allPlayers).length
          playerRef.update({
            num: playerNum
          })
          document.querySelector(`.player${playerNum}Username`).innerHTML = user.displayName || "Guest";
          document.querySelector(`.player${playerNum}Username`).style = "color: red;"
          document.querySelector(`.player${playerNum}Character`).innerHTML = `<div class=${gotchu}></div>`;
          document.querySelector(`.player${playerNum}Icon`).innerHTML = `<div class=${gotchu}Icon></div>`;


          Object.values(allPlayers).forEach((player) => {
            if (playerId !== player.id) {
              if (playerNum === 1) {
                document.querySelector(`.player2Character`).innerHTML = `<div class=${player.gotchu}></div>`;
                document.querySelector(`.player2Icon`).innerHTML = `<div class=${player.gotchu}Icon></div>`;
              }
              if (playerNum === 2) {
                document.querySelector(`.player1Username`).innerHTML = player.name || "Guest";
                document.querySelector(`.player1Character`).innerHTML = `<div class=${player.gotchu}></div>`;
                document.querySelector(`.player1Icon`).innerHTML = `<div class=${player.gotchu}Icon></div>`;
              }
            }
          })
        })
        playerRef.onDisconnect().remove();
        lobbyRef.onDisconnect().remove();
      })
    } else {
      window.location.href = `/`
    }
  })
})();


