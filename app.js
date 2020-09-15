const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose =require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

const Campground = mongoose.model("Campground", campgroundSchema);

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", {campgrounds: allCampgrounds});
    }
  });
});

app.get("/campgrounds/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/campgrounds", (req, res) => {
  const name = req.body.name;
  const image = req.body.image;
  const description = req.body.description;
  const newCampground = {name: name, image: image, description: description};
  // Create a new campground and save to DB
  Campground.create(newCampground, (err, newlyCreated) => {
    if(err){
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

app.get("/campgrounds/:id", (req, res) => {
  // Find the campground with provided ID
  Campground.findById(req.params.id, (err, foundCampground) => {
    if(err){
      console.log(err);
    } else {
      // Render show template with that campground
      res.render("show", {campground: foundCampground});
    }
  });
});

app.listen(3000, () => {
  console.log("The Yelp Camp Server has started!");
});
