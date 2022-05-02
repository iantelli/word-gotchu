const functions = require("firebase-functions");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

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

app.set("view engine", "ejs");


app.get("/expressTest", (req, res) => {
  const date = Date.now();
  const data = `Hello from Express! ${date}`;
  res.render("../public/test.ejs", {data});
});

app.get("/app/:id", (req, res) => {
  const id = req.params.id;
  const data = `Hello from Express! ${id}`;
  res.render("../public/test.ejs", {data});
});

exports.app = functions.https.onRequest(app);
