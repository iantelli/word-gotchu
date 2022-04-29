const router = require('express').Router();

const db = require("../fakedb");

router.get("/", (req, res) => {
  res.render("index", {})
})

router.get("/lobby", (req, res) => {
  res.redirect(`/lobby/${"TEST"}`)
})

router.get("/lobby/:id", (req, res) => {
  const id = req.params.id;
  const lobby = db.getLobby(id);
  if (!lobby.currentGame) {
    db.createGame(id);
  }

  let player;

  if (req.session[id]) {
    player = req.session[id]
  } else if (!lobby.playerOne) {
    player = 1
    req.session[id] = 1
    lobby.playerOne = true;
  } else if (!lobby.playerTwo) {
    player = 2
    req.session[id] = 2
    lobby.playerTwo = true;
  }


  console.log(lobby)
  console.log(player)
  console.log(req.session)

  res.render("lobby.ejs", { player })
})

module.exports = router;