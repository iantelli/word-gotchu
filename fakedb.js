let users = {
  "gigachad": {
    username: "gigachad",
    password: "password"
  }
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

module.exports = {
  isUsernameTaken,
  createUser,
  authenticateUser
}