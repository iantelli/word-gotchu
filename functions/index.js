// const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

const router = require("./routes/router");
const apiRouter = require("./routes/api");
// const db = require("./fakedb")

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
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


module.exports = app;
