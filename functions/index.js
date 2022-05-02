const functions = require("firebase-functions");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors({option: true}));

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

// exports.helloWorld = functions.https.onRequest((req, res) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   res.send("Hello from Firebase!");
// });


app.get("/expressTest", (req, res) => {
  res.sendFile(path.join(__dirname + "/../public/express.html"));
});

app.get("/id/:id", (req, res) => {
  res.sendFile(path.join(__dirname + ".." + "/public/id.html"));
});

app.get("/testSend", (req, res) => {
  res.status(200).send("Connected!");
});

console.log(__dirname);


exports.app = functions.https.onRequest(app);
