const http = require("http");
const socketio = require("socket.io")
require("dotenv").config();

const app = require("./app.js");
const server = http.createServer(app)
const io = socketio(server);

io.on("connection", (socket) => {
  console.log("New WS connection")
})

const PORT = process.env.PORT || 8080;
const URL = process.env.URL || `http://localhost:${PORT}/`  

server.listen(PORT, () => console.log(`Server running on port ${PORT} \nwebsite: ${URL}`));