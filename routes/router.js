const router = require('express').Router();

router.get("/", (req, res) => {
  res.render("../public/index.html")
})

router.get("/lobby", (req, res) => {
  res.redirect("/")
})

router.get("/lobby/:id", (req, res) => {
  res.render("../public/lobby.html")
})

module.exports = router;