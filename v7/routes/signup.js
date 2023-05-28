const express = require("express");
const User = require("../models/user");
const router = express.Router();
const passport = require("passport");

router.get("/", (req, res) => {
  res.render("register/signup");
});

router.post("/", (req, res, next) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    function (err) {
      if (err) {
        console.log(err);
        req.flash("error", err.message);
        return res.render("register/signup");
      }

      passport.authenticate("local", function (err, user, info) {
        if (err) {
          return next(err);
        }

        if (!user) {
          req.flash("error", "Invalid username or password.");
          return res.redirect("/login");
        }

        req.logIn(user, function (err) {
          if (err) {
            return next(err);
          }

          req.flash("success", "You have been successfully signed up.");
          return res.redirect("/");
        });
      })(req, res, next);
    }
  );
});

module.exports = router;

