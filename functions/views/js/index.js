/* eslint-disable */

const socket = io()

let intervalID;

function startGame() {
  let timer = 60;

  let timerID;
  timerID = setInterval(() => {
    if (timer > 0) {
      timer--;
    document.getElementById("timer").innerHTML = "Time remaining : " + timer + " seconds";
    }
    if (timer <= 0) {
      clearInterval(timerID)
      document.getElementById("timer").innerHTML = "";
      document.querySelector(".container").innerHTML = "Done!"
    }
  }, 1000);
}

function checkForOtherPlayer() {
  axios.post("/api/v1/getPlayers", {
    id: window.location.pathname.split("/")[2],
    player
  })
    .then(response => {
      const otherPlayer = response.data.otherPlayer;
      console.log(otherPlayer)
      if (otherPlayer) {
        clearInterval(intervalID);
        startGame();
      }

    })
    .catch(error => {
      console.log(error)
    })
}

intervalID = setInterval(checkForOtherPlayer, 1000)
