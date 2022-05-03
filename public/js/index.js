const socket = io()

import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from "firebase/functions";

const app = initializeApp({
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
});

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
