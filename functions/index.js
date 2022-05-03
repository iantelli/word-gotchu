// const firebase = require("firebase");
// const admin = require("firebase-admin");
const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//


const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const path = require("path");

// const router = require("./routes/router");
// const apiRouter = require("./routes/api");

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors({option: true}));

app.get("/test", (req, res) => {
  res.status(200).send("Connected!");
});

exports.app = functions.https.onRequest(app);


exports.helloWorld = functions.https.onRequest((req, res) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  res.send("Hello from Firebase!");
});
