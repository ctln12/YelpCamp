const express = require("express");
const campground = require("../models/campground");
const router = express.Router();
const Campground = require("../models/campground");
const middleware = require("../middleware");

// Campgrounds Index
router.get("/", (req, res) => {
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", { campgrounds: allCampgrounds });
    }
  });
});

// Campgrounds New
router.get("/new", middleware.isLoggedIn, (req, res) => {
  res.render("campgrounds/new.ejs");
});

// Campgrounds Create
router.post("/", middleware.isLoggedIn, (req, res) => {
  const name = req.body.name;
  const image = req.body.image;
  const description = req.body.description;
  const price = req.body.price;
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  const newCampground = { name: name, image: image, description: description, price: price, author: author };
  // Create a new campground and save to DB
  Campground.create(newCampground, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

// Campgrounds Show
router.get("/:id", (req, res) => {
  // Find the campground with provided ID
  Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
    if (err || !foundCampground) {
      req.flash("error", "Campground not found");
      res.redirect("back");
    } else {
      // Render show template with that campground
      res.render("campgrounds/show", { campground: foundCampground });
    }
  });
});

// Campgrounds Edit
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
    res.render("campgrounds/edit", { campground: foundCampground });
  });
});

// Campgrounds Update
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
    if(err){
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// Campgrounds Destroy
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndRemove(req.params.id, (err) => {
    if(err){
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  });
});

module.exports = router;
