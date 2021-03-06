const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose =require("mongoose");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const methodOverride = require("method-override");

const Campground = require("./models/campground");
const Comment = require("./models/comment");
const User = require("./models/user");

const seedDB = require("./seeds");

// REQUIRING ROUTES
const campgroundRoutes = require("./routes/campgrounds");
const commentRoutes = require("./routes/comments");
const indexRoutes = require("./routes/index");

mongoose.connect(
  process.env.MONGODB_URL || "mongodb://localhost:27017/yelp_camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }).then(() => {
    console.log('Connected to DB');
  }).catch(err => {
    console.log("ERROR: ", err.message);
  });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
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
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

// ROUTES
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/", indexRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("The Yelp Camp Server has started!");
});
