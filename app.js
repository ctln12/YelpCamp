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
  image: String
});

const Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {
//     name: "Granite Hill",
//     image:
//       "https://www.nps.gov/grte/planyourvisit/images/JLCG_tents_Teewinot_2008_mattson_1.JPG",
//   },
//    (err, campground) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Newly created campground");
//       console.log(campground);
//     }
//   }
// );

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds", {campgrounds: allCampgrounds});
    }
  });
});

app.get("/campgrounds/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/campgrounds", (req, res) => {
  const name = req.body.name;
  const image = req.body.image;
  const newCampground = {name: name, image: image};
  // Create a new campground and save to DB
  Campground.create(newCampground, (err, newlyCreated) => {
    if(err){
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

app.listen(3000, () => {
  console.log("The Yelp Camp Server has started!");
});
