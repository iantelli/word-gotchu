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

const backgroundElement = document.querySelector(".background")

function reScaleWhatever() {
  const scaleWidth = window.innerWidth/1440
  const scaleHeight = window.innerHeight/1024
  backgroundElement.style.transform = `scale(${scaleWidth,scaleHeight}`
  const y = 1024 * (1029/(backgroundElement.offsetHeight+35))
  const backgroundStyle = `url("../images/assets_spritesheet.png") no-repeat -0px -${y}px`
  backgroundElement.style.background = backgroundStyle
  backgroundElement.style.width = `${window.innerWidth*(1/scale)}px`
  console.log(backgroundStyle)
  console.log((scale-.77))

}
window.addEventListener("resize", event => {
  reScaleWhatever()
})

reScaleWhatever()

