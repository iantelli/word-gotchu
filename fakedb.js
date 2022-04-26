let users = {
  "gigachad": {
    username: "gigachad",
    password: "password"
  }
}

let words = ["robin","ultra","ulcer","pause","humor","frame","elder","skill","aloft","pleat","shard","moist","those","light","wrung","could","perky","mount","whack","sugar","knoll","crimp","wince","prick","robot","point","proxy","shire","solar","panic","tangy","abbey","drink","query","gorge","crank","slump","banal","tiger","siege","truss","boost","rebus"]

let game = {
  totalGuesses: 0,
  completed: false,
  correctCharacterPlacements: new Array(5).fill("_"),
  correctCharacters: new Set(),
  incorrectCharacters: new Set(),
  answer: wordleRandom(),
}

function isUsernameTaken(username) {
  return !!users[username];
}

function createUser(username, password) {
  if (!isUsernameTaken(username)) {
    users[username] = {
      username,
      password,
    }
    return true;
  } else {
    return false;
  }
}

function authenticateUser(username, password) {
  if (users[username]) {
    let user = users[username];
    if (user.password === password) {
      return { username: user.username }
    }
  } else {
    return null;
  }
}

function wordleRandom() {
  return words[Math.floor(Math.random() * words.length)];
}

function guessWord(word) {
  if (word.length != 5) {
    return;
  }

  game.totalGuesses++;

  if(word === game.answer) {
    game.completed = true;
  }
  word.split("").forEach((letter, index) => {
    
    if (!game.answer.includes(letter)) {
      game.incorrectCharacters.add(letter);
      return
    }

    game.correctCharacters.add(letter);
    if (word[index] === game.answer[index]) {
      game.correctCharacterPlacements[index] = letter
    }
  })
}

function getGame() {
  return game;
}

module.exports = {
  isUsernameTaken,
  createUser,
  authenticateUser,
  getGame,
  guessWord,
  wordleRandom,
}