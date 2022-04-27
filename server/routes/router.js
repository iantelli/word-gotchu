const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("hey")
})

module.exports = router;