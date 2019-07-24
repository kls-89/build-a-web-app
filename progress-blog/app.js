require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressSanitizer = require('express-sanitizer');

// MODELS
const Post = require("./models/post");

// DB CONNECTION
const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PW}@webdev-cluster-kls-qduay.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(connectionString, { useNewUrlParser: true, dbName: "BuildWebApp_Blog", useFindAndModify: false})
  .then(console.log("SUCCESSFULLY CONNECTED TO MONGO DB ATLAS CLUSTER."))
  .catch(err => console.log("ERROR CONNECTING TO ATLAS CLUSTER", err));


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(methodOverride('_method'));
app.set("view engine", "ejs");
app.use(express.static("public"));

// INDEX ROUTE
app.get("/", (req, res, next) => {
  res.redirect("/blogs")
});
app.get("/blogs", (req, res, next) => {
  Post.find({}, (err, posts) => {
    if (err) {
      console.log("ERROR RETREIVING POSTS", err);
    } else {
      res.render("index", { posts: posts});
    }
  })
});

// NEW ROUTE -- Render form to create new blog post
app.get("/blogs/new", (req, res, next) => {
  res.render("new");
});

// CREATE ROUTE -- Handle 
app.post("/blogs", (req, res, next) => {
  req.body.blog.body = req.sanitize(req.body.blog.body)
  Post.create(req.body.blog, (err, post) => {
    if (err) {
      console.log("ERROR ADDING POST TO DB", err);
    } else {
      console.log(post);
      res.redirect("/blogs");
    }
  });

});

// SHOW ROUTE -- Display individual post
app.get("/blogs/:id", (req, res, next) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      console.log("ERROR DISPLAYING INDIVIDUAL POST IN SHOW ROUTE", err);
    } else {
      res.render("show", {post: post})
    }
  })
});


// EDIT ROUTE -- Render form to edit a specific post.
app.get("/blogs/:id/edit", (req, res, next) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      console.log("ERROR DISPLAYING EDIT FORM FOR THIS POST", err);
    } else {
      res.render("edit", {post: post});
    }
  });
});

// UPDATE ROUTE -- Handle Update to a specific post.
app.put("/blogs/:id", (req, res, next) => {
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Post.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedPost) => {
    if (err) {
      console.log("ERROR UPDATING BLOG POST", err);
    } else {
      res.redirect(`/blogs/${req.params.id}`);
    }
  });
});

// PREVIEW ROUTE -- Redirects Update form to a preview page, which is not yet saved to the DB.
app.post("/blogs/:id/preview", (req, res, next) => {
  const id = req.params.id;
  res.render("preview", {post: req.body.blog, id: id});
});


// DELETE ROUTE -- Handle Delete Action for a specific post.
app.delete("/blogs/:id", (req, res, next) => {
  Post.findByIdAndDelete(req.params.id, (err, post) => {
    if (err) {
      console.log("ERROR DELETING POST", err);
    } else {
      res.redirect("/blogs");
    }
  })
})

app.listen(3000, _ => console.log('blog app running'));