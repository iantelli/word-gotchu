const firebase = require("firebase");
const functions = require("firebase/functions");

firebase.initializeApp({
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
});

const database = firebase.database();
const dbRef = database.ref();

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

exports.getPlayerById = functions.https.onCall((data, context) => {
  const id = data.id;
  dbRef.child("users").child(id).once
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          return null;
        }
      })
      .catch((error) => {
        console.log(error);
      });
});
