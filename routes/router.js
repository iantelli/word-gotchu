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

  res.render("lobby.ejs", {})
})

module.exports = router;