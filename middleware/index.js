const Campground = require("../models/campground");
const Comment = require("../models/comment");

// All the middlewares
const middlewareObject = {};

// Authentication
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You need to be logged in");
  res.redirect("/login");
};

// Campground Authorization
const checkCampgroundOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, (err, foundCampground) => {
      if (err) {
        req.flash("error", "Campground not found");
        res.redirect("back");
      } else {
        if (foundCampground.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You don't have permission");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You need to be logged in");
    res.redirect("back");
  }
};

// Comment Authorization
const checkCommentOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if (err) {
        console.log(err);
        res.redirect("back");
      } else {
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You don't have permission");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You need to be logged in");
    res.redirect("back");
  }
};

middlewareObject.isLoggedIn = isLoggedIn;

middlewareObject.checkCampgroundOwnership = checkCampgroundOwnership;

middlewareObject.checkCommentOwnership = checkCommentOwnership;

module.exports = middlewareObject;
