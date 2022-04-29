require("dotenv").config();
const http = require("http");
const socketIO = require("socket.io")

const app = require('./app.js');
const server = http.createServer(app);
const io = socketIO(server)

io.on("connection", (socket) => {
  console.log("New ws connection...")
})

const port = process.env.PORT || 8080;
const url = process.env.URL || `http://localhost:${port}/`

server.listen(port, () => console.log(`Server running on port ${port} \nwebsite: ${url}`));