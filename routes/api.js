const router = require('express').Router();

const db = require("../fakedb");

router.get("/", (req, res) => {
  res.status(200).send({ message: "Hey!" })
})

module.exports = router;