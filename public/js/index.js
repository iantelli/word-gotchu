const socket = io()

import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from "firebase/functions";

const app = initializeApp({
  projectId: process.env.PROJECT_ID,
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
})

const functions = getFunctions(app);

const textTest = httpsCallable(functions, "sendText");
textTest({ text: "Some test string" })
  .then(response => {
    document.querySelector("#testspan").innerHTML = response.data.text;
  })
  .catch(error => console.log(err));

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
