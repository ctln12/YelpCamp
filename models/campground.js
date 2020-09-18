// SCHEMA SETUP
const mongoose = require("mongoose");

const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      red: "Comment"
    }
  ]
});

module.exports = mongoose.model("Campground", campgroundSchema);
