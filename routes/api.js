const router = require('express').Router();

const db = require("../fakedb");

router.get("/", (req, res) => {
  res.status(200).send({ message: "Hey!"})
})

router.get("/lobby", (req, res) => {
  const lobby = db.getLobby();
  lobby.currentGame = db.getGame();
  lobby.numOfGames++;
  res.render("lobby.ejs", {
    lobby,
  })
})

router.post("/lobby", (req, res) => {
  const word = req.body.word
  const wordList = db.getWordList();
  if (wordList.indexOf(word) > -1) {
    db.guessWord(word);
    const lobby = db.getLobby();
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
})

router.post("/lobbyWin", (req, res) => {
  const game = req.body.word
  const lobby = db.getLobby();
  lobby.prevGames.push(game);
  lobby.currentGame = db.createGame();
  lobby.numOfGames++;
  lobby.totalCorrect++;
  console.log(lobby);
})

router.post("/lobbyLose", (req, res) => {
  const game = req.body.word
  const lobby = db.getLobby();
  lobby.prevGames.push(game);
  lobby.currentGame = db.createGame();
  lobby.numOfGames++;
  lobby.totalIncorrect++;
  console.log(lobby);
})


module.exports = router;