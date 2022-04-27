const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const app = express();

app.use(express.static("static"))

app.set('view engine', 'ejs')



app.get('/', (req, res) => {
    res.render('index.ejs');
});


app.get("/lobby", (req, res) => {
    res.render('lobby.ejs');
});



module.exports = app;