const router = require("express").Router();

router.get("/", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    req.flash("success", "Logged out successfully.");
    res.redirect("/");
  });
});

module.exports = router;
