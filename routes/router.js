const router = require('express').Router();

router.get("/", (req, res) => {
  res.render("index");
})

router.get("/lobby", (req, res) => {
  res.redirect("/")
})

router.get("/lobby/:id", (req, res) => {
  res.render("lobby")
})

module.exports = router;