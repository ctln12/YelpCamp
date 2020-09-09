const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

const campgrounds = [
  {
    name: "Salmon Creek",
    image:
      "https://media.wzzm13.com/assets/KUSA/images/c4403859-a976-48a1-8db2-4d180817128a/c4403859-a976-48a1-8db2-4d180817128a_750x422.jpg",
  },
  {
    name: "Granite Hill",
    image:
      "https://www.nps.gov/grte/planyourvisit/images/JLCG_tents_Teewinot_2008_mattson_1.JPG",
  },
  {
    name: "Mountain Goat's Rest",
    image:
      "https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
  },
  {
    name: "Salmon Creek",
    image:
      "https://media.wzzm13.com/assets/KUSA/images/c4403859-a976-48a1-8db2-4d180817128a/c4403859-a976-48a1-8db2-4d180817128a_750x422.jpg",
  },
  {
    name: "Granite Hill",
    image:
      "https://www.nps.gov/grte/planyourvisit/images/JLCG_tents_Teewinot_2008_mattson_1.JPG",
  },
  {
    name: "Mountain Goat's Rest",
    image:
      "https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
  },
  {
    name: "Salmon Creek",
    image:
      "https://media.wzzm13.com/assets/KUSA/images/c4403859-a976-48a1-8db2-4d180817128a/c4403859-a976-48a1-8db2-4d180817128a_750x422.jpg",
  },
  {
    name: "Granite Hill",
    image:
      "https://www.nps.gov/grte/planyourvisit/images/JLCG_tents_Teewinot_2008_mattson_1.JPG",
  },
  {
    name: "Mountain Goat's Rest",
    image:
      "https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
  },
];

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
  res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/campgrounds", (req, res) => {
  const name = req.body.name;
  const image = req.body.image;
  const newCampground = {name: name, image: image};
  campgrounds.push(newCampground);;
  res.redirect("/campgrounds");
});

app.listen(3000, () => {
  console.log("The Yelp Camp Server has started!");
});
