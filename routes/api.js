const router = require('express').Router();

router.get("/", (req, res) => {
  res.status(200).send({ message: "Hey!" })
})

module.exports = router;