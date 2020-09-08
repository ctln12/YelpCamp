const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
  const campgrounds = [
    { name: "Salmon Creek", image: "https://media.wzzm13.com/assets/KUSA/images/c4403859-a976-48a1-8db2-4d180817128a/c4403859-a976-48a1-8db2-4d180817128a_750x422.jpg"},
    { name: "Granite Hill", image: "https://www.nps.gov/grte/planyourvisit/images/JLCG_tents_Teewinot_2008_mattson_1.JPG"},
    { name: "Mountain Goat's Rest", image: "https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"}
  ];

  res.render("campgrounds", {campgrounds: campgrounds});
});

app.listen(3000, () => {
  console.log("The Yelp Camp Server has started!");
});
