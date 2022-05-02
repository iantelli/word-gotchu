const functions = require("firebase-functions");

// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const path = require("path");

// const app = express();


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

// exports.helloWorld = functions.https.onRequest((req, res) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   res.send("Hello from Firebase!");
// });


// app.get("/expressTest", (req, res) => {
//   res.sendFile(path.join(__dirname + "/views/express.html"));
// });

// app.get("/id/:id", (req, res) => {
//   res.sendFile(path.join(__dirname + "/views/id.html"));
// });

// app.get("/testSend", (req, res) => {
//   res.status(200).send("Connected!");
// });

const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");


const router = require("./routes/router");
const apiRouter = require("./routes/api");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors({option: true}));

app.set("view engine", "ejs");
app.use(cookieSession({
  name: "player",
  keys: ["cookieMonsterProtection1", "cookieMonsterProtection2"],
}));
app.use(express.static("public"));

app.use("/", router);
app.use("/api/v1", apiRouter);


// Error Handling
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
  });
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

exports.app = functions.https.onRequest(app);
