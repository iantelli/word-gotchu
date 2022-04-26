const router = require('express').Router();

const db = require("../fakedb");

router.get("/", (req, res) => {
  res.status(200).send({ message: "Hey!"})
})

router.get("/lobby", (req, res) => {
  const game = db.getGame();
  res.render("lobby.ejs", {
    game,
  })
})

router.post("/lobby", (req, res) => {
  const word = req.body.word
  db.guessWord(word);
  const game = db.getGame();
  const correctCharacters = Array.from(game.correctCharacters);
  const incorrectCharacters = Array.from(game.incorrectCharacters);
  console.log(db.getGame())
  res.send({
    word: {
      ...game, 
      correctCharacters,
      incorrectCharacters,
    }
  })
})


module.exports = router;