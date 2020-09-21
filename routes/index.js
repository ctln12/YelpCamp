const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

// Middleware
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

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
      console.log(err);
      res.render("register");
    } else {
      passport.authenticate("local")(req, res, () => {
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
  res.redirect("/campgrounds");
});

module.exports = router;
