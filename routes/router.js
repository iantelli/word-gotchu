const router = require('express').Router();

router.get("/", (req, res) => {
  res.render("index")
})

router.get("/lobby", (req, res) => {
  res.redirect("/")
})

router.get("/lobby/:id", (req, res) => {
  res.render("lobby")
})

router.get("/gameover", (req, res) => {
  const gameResult = {
    winner: false,
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
    lvl1Story: "QWErty",
    lvl2Story: "ASDfgh",
    lvl3Story: "ZXCvbn",
    lvl1Ability: "QWErty",
    lvl2Ability: "ASDfgh",
    lvl3Ability: "ZXCvbn",
  }
  res.render("homepage", { data, pet })
})

router.get("/testpage", (req, res) => {
  const data = {
    playerCurrency: 1000,
    username: "USER",
  }
  const pet = {
    lvl: 1,
    xp: 10,
    lvl1Story: "QWErty",
    lvl2Story: "ASDfgh",
    lvl3Story: "ZXCvbn",
    lvl1Ability: "QWErty",
    lvl2Ability: "ASDfgh",
    lvl3Ability: "ZXCvbn",
  }
  res.render("testpage", { data, pet })
})

module.exports = router;