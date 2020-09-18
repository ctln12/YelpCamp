const mongoose = require("mongoose");
const campground = require("./models/campground");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

const data = [
  {
    name: "Cloud's Rest",
    image: "https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80",
    description: "A flower in my garden, a mystery in my panties. Heart attack never stopped old Big Bear. I didn't even know we were calling him Big Bear. We never had the chance to. Maybe it was the eleven months he spent in the womb. The doctor said there were claw marks on the walls of her uterus. Yeah, well, have you seen the new Mustang?"
  },
  {
    name: "Granite Hill",
    image: "https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
    description: "Flatland! Hypatia. Galaxies Orion's sword globular star cluster? Light years quasar as a patch of light gathered by gravity Vangelis radio telescope. Stirred by starlight vanquish the impossible Tunguska event cosmic fugue courage of our questions worldlets galaxies birth colonies. Vastness is bearable only through love."
  },
  {
    name: "Desert Mesa",
    image: "https://images.unsplash.com/photo-1502218808493-e5fd26249efc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    description: "Just say anything, George, say what ever's natural, the first thing that comes to your mind. Take that you mutated son-of-a-bitch. My pine, why you. You space bastard, you killed a pine. You do? Yeah, it's 8:00. Hey, McFly, I thought I told you never to come in here. Well it's gonna cost you. How much money you got on you?"
  },
  {
    name: "Canyon Floor",
    image: "https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
    description: "A slice of heaven. O for awesome, this chocka full cuzzie is as rip-off as a cracker. Meanwhile, in behind the bicycle shed, Hercules Morse, as big as a horse and Mrs Falani were up to no good with a bunch of crook pikelets. Meanwhile, at the black singlet woolshed party, not even au, sort your drinking out."
  }
]

const seedDB = () => {
  // Remove all campgrounds
  Campground.deleteMany({}, (err) => {
    if(err){
      console.log(err);
    } else {
      console.log("removed campgrounds");

      // add a few campgrounds
      data.forEach((seed) => {
        Campground.create(seed, (err, campground) => {
          if (err) {
            console.log(err);
          } else {
            console.log("added a campground");

            // create a comment
            Comment.create(
              {
                text: "This place is great, but I wish there was Internet!",
                author: "Homer"
              },
              (err, comment) => {
                if(err){
                  console.log(err);
                } else {
                  campground.comments.push(comment);
                  campground.save();
                  console.log("created new comment");
                }
              });
          }
        });
      });
    }
  });
}

module.exports = seedDB;
