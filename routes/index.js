const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

// Root
router.get("/", (req, res) => {
  res.render("landing");
});

// Sign up
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      res.render("register", { "error": err.message });
    } else {
      passport.authenticate("local")(req, res, () => {
        req.flash("success", "Welcome to YelpCamp, " + user.username);
        res.redirect("/campgrounds");
      });
    }
  });
});

// Login
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/campgrounds", failureRedirect: "/login"
}), (req, res) => {
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "Logged you out");
  res.redirect("/campgrounds");
});

module.exports = router;
