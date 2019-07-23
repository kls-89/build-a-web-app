require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// MODELS
const Post = require("./models/post");

// DB CONNECTION
const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PW}@webdev-cluster-kls-qduay.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(connectionString, { useNewUrlParser: true, dbName: "BuildWebApp_Blog" })
  .then(console.log("SUCCESSFULLY CONNECTED TO MONGO DB ATLAS CLUSTER."))
  .catch(err => console.log("ERROR CONNECTING TO ATLAS CLUSTER", err));


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// INDEX ROUTE
app.get("/", (req, res, next) => {
  res.redirect("/blogs")
});
app.get("/blogs", (req, res, next) => {
  Post.find({}, (err, posts) => {
    if (err) {
      console.log("ERROR RETREIVING POSTS", err);
    } else {
      res.render("index", { posts: posts });
    }
  })
});

// NEW ROUTE -- Render form to create new blog post
app.get("/blogs/new", (req, res, next) => {
  res.render("new");
});

// CREATE ROUTE -- Handle 
app.post("/blogs", (req, res, next) => {
  Post.create(req.body.blog, (err, post) => {
    if (err) {
      console.log("ERROR ADDING POST TO DB", err);
    } else {
      console.log(post);
      res.redirect("/blogs");
    }
  });

});

// SHOW ROUTE
app.get("/blogs/:id", (req, res, next) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      console.log("ERROR DISPLAYING INDIVIDUAL POST IN SHOW ROUTE", err);
    } else {
      res.render("show", {post: post})
    }
  })
});

app.listen(9889, _ => console.log('blog app running'));