# YelpCamp

### Description

This project aims to build an application for people who like camping, want to share their favourite campgrouds and discover new ones. It's a CRUD app with authentication built with Node, Express and MongoDB.

### Technologies

*Languages:* Javascript, HTML, CSS

*Database:* MongoDB

*NPM Packages:* body-parser, connect-flash, ejs, express, express-session, method-override, mongoose, passport, passport-local, passport-local-mongoose

*Runtime environment:* Node

*Framework:* Bootstrap 3

### Key features

- View landing page
- View all the campgrounds
- View a campground
- View all the comments of a campground
- Sign up/Login
- Create a new campground if authenticated
- Create a new comment if authenticated
- Edit a campground if authenticated and owner
- Edit a comment if authenticated and owner
- Delete a campground if authenticated and owner
- Delete a comment if authenticated and owner

### Project status

The project isn't completely done.

The signup/login forms should be worked on. Some additional features could be added such as adding a dynamic comment time/date, adding a footer, migrating to Bootstrap 4, adding a location and map for campgrounds, adding a search for campgrounds, creating a user profile...

### Credits & Sources

- Images from [Unsplash](https://unsplash.com/)
- Campground descriptions from different [Lorem Ipsum generators](https://loremipsum.io/)
- Final project built while completing [The Web Developer Bootcamp](https://www.udemy.com/course/the-web-developer-bootcamp/)

---

## Development Guidelines
*provided by instructor Colt Steele*

### Initial Setup (v1)
* Add Landing Page
* Add Campgrounds Page that lists all campgrounds
* Create Campground model containing:
  * a Name
  * an Image

### Layout and Basic Styling
* Create our header and footer partials
* Add in Bootstrap

### Creating New Campgrounds
* Setup new campground POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

### Style the campgrounds page
* Add a better header/title
* Make a campgrounds display in a grid

### Style the Navbar and Form
* Add a navbar to all templates
* Style the new campground form

### Add Mongoose (v2)
* Install and configure mongoose
* Setup campground model
* Use campground model inside of our routes!

### Show page
* Review the RESTful routes we've seen so far
* Add description to our campground model
* Show db.collection.drop()
* Add a show route and template

### Refactor Mongoose Code (v3)
* Create a models directory
* Use module.exports
* Require everything correctly!

### Add Seeds File
* Add a seeds.js file
* Run the seeds file every time the server starts

### Add the Comment model
* Make our errors go away!
* Display comments on campground show page

### Comment New/Create (v4)
* Add the comment NEW and CREATE routes
* Add the new comment FORM

### Style Show Page (v5)
* Add sidebar to show page
* Display comments nicely

### Finish Styling Show Page
* Add public directory
* Add custom stylesheet

### Auth Pt. 1 - Add User Model (v6)
* Install all packages needed for auth
* Define User model

### Auth Pt. 2 - Register
* Configure Passport
* Add register routes
* Add register template

### Auth Pt. 3 - Login
* Add login routes
* Add login template

### Auth Pt. 4 - Logout/Navbar
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar

### Auth Pt. 5 - Show/Hide links
* Show/Hide auth links correctly

### Refactor the routes (v7)
* Use Express router to reorganize all routes

### Users + Comments (v8)
* Associate users and comments
* Save author's name to a comment automatically

### Users + Campgrounds (v9)
* Prevent an unauthenticated user from creating a campground
* Save username + id to newly created campground

### Editing Campgrounds (v10)
* Add method-override
* Add EDIT route for campgrounds
* Add link to edit page
* Add UPDATE route
* Fix $set problem

### Deleting Campgrounds
* Add DESTROY route
* Add delete button

### Authorization
* User can only edit his/her campgrounds
* User can only delete his/her campgrounds
* Hide/Show edit and delete buttons

### Editing Comments
* Add EDIT route for comments
* Add link to edit page
* Add UPDATE route

### Deleting Comments
* Add DESTROY route
* Add delete button

### Authorization Part 2: Comments
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/Show edit and delete buttons
* Refactor Middlewares

### Adding in Flash! (v11)
* Install and configure connect-flash
* Add bootstrap alerts to header

### Landing Page Refactor (v12)
* Add Full Screen Background Image Slider

### Adding Dynamic Price Feature
* Add price to Campground model
* Add price to create campground route
* Add price input to new and edit campground forms
* Add campground price to show template

### Handle errors to prevent app from crashing
* Campgrounds NEW route:
  * Add condition to checkCampgroundOwnership middleware if a campground can't be found
* Campgrounds SHOW route:
  * Add condition, flash message and redirection to SHOW route if a campground can't be found
* Comments EDIT route:
  * Add condition and flash message to checkCommentOwnership middleware if a comment can't be found
  * Add condition and flash message to comments EDIT route if a corresponding campground can't be found

### Deployment of v12
* Add script "start": "node app.js" to package.json
* Create Heroku app and push master to Heroku
* Create a Mongo DB Atlas account and follow setup
* Add production DB path to mongoose.connect
