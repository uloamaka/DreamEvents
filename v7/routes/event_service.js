const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("events/event");
});

module.exports = router;
