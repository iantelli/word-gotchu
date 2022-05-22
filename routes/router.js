const router = require('express').Router();

router.get("/", (req, res) => {
  const data = {
    playerCurrency: 1000,
    username: "USER",
  }
  const pet = {
    lvl: 1,
    xp: 10,
    lvl1Story: "qwerty",
    lvl2Story: "asdfgh",
    lvl3Story: "zxcvbn",
  }
  res.render("index", { data, pet })
})

router.get("/lobby", (req, res) => {
  res.redirect("/")
})

router.get("/lobby/:id", (req, res) => {
  const bothPlayersConnected = false;
  const userName = "You";
  const opponentName = "Opponent";
  res.render("ready", { bothPlayersConnected, userName, opponentName })
})

router.get("/lobby/:id/:gotchu/win", (req, res) => {
  const gotchu = req.params.gotchu;
  const gameResult = {
    winner: true,
    xpChange: 25,
    reward: 100,
  }
  res.render("gameEnd", { gameResult, gotchu })
})

router.get("/lobby/:id/:gotchu/lose", (req, res) => {
  const gotchu = req.params.gotchu;
  const gameResult = {
    winner: false,
    xpChange: 25,
    reward: 5,
  }
  res.render("gameEnd", { gameResult, gotchu })
})

//temp cause no users
router.get("/lobby/:id/:gotchu", (req, res) => {
  const gotchu = req.params.gotchu;
  res.render("lobby", { gotchu })
})



router.get("/homepage", (req, res) => {
  const data = {
    playerCurrency: 1000,
    username: "USER",
  }
  const pet = {
    lvl: 1,
    xp: 10,
    lvl1Story: "qwerty",
    lvl2Story: "asdfgh",
    lvl3Story: "zxcvbn",
  }
  res.render("homepage", { data, pet })
})

router.get("/test", (req, res) => {
  const roundNumber = 1;
  res.render("test", { roundNumber })
})

router.get("/gacha", (req, res) => {
  res.render("gotchuGacha")
})

router.get("/assets", (req, res) => {
  res.render("assetTest")
})

module.exports = router;