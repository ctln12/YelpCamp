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

// REQUIRING ROUTES
const campgroundRoutes = require("./routes/campgrounds");
const commentRoutes = require("./routes/comments");
const indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
// seedDB();

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

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// ROUTES
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/", indexRoutes);

app.listen(3000, () => {
  console.log("The Yelp Camp Server has started!");
});
