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
  res.render("lobby")
})

router.get("/gameover", (req, res) => {
  const gameResult = {
    winner: true,
    xpChange: 25,
    reward: 100,
  }
  res.render("gameEnd", { gameResult })
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

module.exports = router;