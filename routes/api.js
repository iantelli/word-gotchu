const router = require('express').Router();

const db = require("../fakedb");

router.get("/", (req, res) => {
  res.status(200).send({ message: "Hey!" })
})

router.post("/lobby", (req, res) => {
  const word = req.body.word
  const id = req.body.id;
  const player = req.body.player;
  console.log(word, id, player)
  // const wordList = db.getWordList();
  // if (wordList.indexOf(word) > -1) {
    db.guessWord(word, id, player);
    console.log("AAAAA")
    const lobby = db.getLobby(id);
    const correctCharacters = Array.from(lobby.currentGame[player].correctCharacters);
    const incorrectCharacters = Array.from(lobby.currentGame[player].incorrectCharacters);
    const correctCharacterPlacements = lobby.currentGame[player].correctCharacterPlacements;
    const totalGuesses = lobby.currentGame[player].totalGuesses;
    const completed = lobby.currentGame[player].completed;
    console.log(lobby.currentGame[player].answer);
    res.send({
      word: {
        correctCharacterPlacements,
        correctCharacters,
        incorrectCharacters,
        totalGuesses,
        completed
      }
    })
  // }
  res.status(200).send()
})

router.post("/lobbyWin", (req, res) => {
  const game = req.body.word
  const id = req.body.id;
  const player = req.body.player;
  const lobby = db.getLobby(id);
  lobby.prevGames.push(game);
  db.createGame(id, player);
  lobby.totalCorrect++;
  res.status(200).send()
})

router.post("/lobbyLose", (req, res) => {
  const game = req.body.word
  const id = req.body.id;
  const player = req.body.player;
  const lobby = db.getLobby();
  lobby.prevGames.push(game);
  db.createGame(id, player);
  lobby.totalIncorrect++;
  res.status(200).send()
})

router.post("/getPlayers", (req, res) => {
  const id = req.body.id;
  const player = req.body.player
  const lobby = db.getLobby(id);

  let otherPlayer = false;
  if (player === 1 && lobby.playerTwo) {
    otherPlayer = true
  }

  if (player === 2 && lobby.playerOne) {
    otherPlayer = true
  }

  res.status(200).send({ otherPlayer })
})

module.exports = router;