const router = require('express').Router();

const db = require("../fakedb");

router.get("/", (req, res) => {
  res.status(200).send({ message: "Hey!" })
})

router.post("/lobby", (req, res) => {
  const word = req.body.word
  const id = req.body.id;
  const wordList = db.getWordList();
  if (wordList.indexOf(word) > -1) {
    db.guessWord(word, id);
    const lobby = db.getLobby(id);
    const correctCharacters = Array.from(lobby.currentGame.correctCharacters);
    const incorrectCharacters = Array.from(lobby.currentGame.incorrectCharacters);
    const correctCharacterPlacements = lobby.currentGame.correctCharacterPlacements;
    const totalGuesses = lobby.currentGame.totalGuesses;
    const completed = lobby.currentGame.completed;
    console.log(lobby.currentGame.answer);
    res.send({
      word: {
        correctCharacterPlacements,
        correctCharacters,
        incorrectCharacters,
        totalGuesses,
        completed
      }
    })
  }
  res.status(200).send()
})

router.post("/lobbyWin", (req, res) => {
  const game = req.body.word
  const id = req.body.id;
  const lobby = db.getLobby(id);
  lobby.prevGames.push(game);
  lobby.currentGame = db.createGame(id);
  lobby.totalCorrect++;
  res.status(200).send()
  console.log(lobby);
})

router.post("/lobbyLose", (req, res) => {
  const game = req.body.word
  const id = req.body.id;
  const lobby = db.getLobby();
  lobby.prevGames.push(game);
  lobby.currentGame = db.createGame(id);
  lobby.totalIncorrect++;
  res.status(200).send()
  console.log(lobby);
})


module.exports = router;