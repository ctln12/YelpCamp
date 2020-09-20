const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose =require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local");
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const User = require("./models/user");
const seedDB = require("./seeds");
const user = require("./models/user");



mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "I want to believe",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ROUTES
app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {campgrounds: allCampgrounds});
    }
  });
});

app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new.ejs");
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
  Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
    if(err){
      console.log(err);
    } else {
      // Render show template with that campground
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});

// ========================
// COMMENTS ROUTES
// ========================
app.get("/campgrounds/:id/comments/new", (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if(err){
      console.log(err);
    } else {
      res.render("comments/new", {campground: campground});
    }
  });
});

app.post("/campgrounds/:id/comments", (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if(err){
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if(err){
          console.log(err);
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect(`/campgrounds/${campground._id}`);
        }
      });
    }
  });
});

// ===========
// AUTH ROUTES
// ===========
// Sign up
app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  const newUser = new user({ username: req.body.username });
  User.register(newUser, req.body.password, (err, user) => {
    if(err){
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
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds", failureRedirect: "/login"
  }), (req, res) => {
});


app.listen(3000, () => {
  console.log("The Yelp Camp Server has started!");
});
