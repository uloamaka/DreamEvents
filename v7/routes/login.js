const router = require("express").Router();
const passport = require("passport");

// Show the login form
router.get("/", (req, res) => {
  res.render("register/login");
});

// Handle user login using Passport's local strategy
router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/gallery", // Redirect to /gallery on successful login
    failureRedirect: "/", // Redirect to / on failed login
    failureFlash: true, // Enable flash messages for failed login
  }),
  (req, res) => {
    // This callback function is optional and can be used for additional processing after successful authentication
  }
);

module.exports = router;
