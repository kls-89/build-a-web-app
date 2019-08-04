const express = require("express");

const router = express.Router();

const Post = require("../models/post");

// INDEX ROUTE
router.get("/", (req, res, next) => {
  res.redirect("/blogs")
});
router.get("/blogs", (req, res, next) => {
  Post.find({}, (err, posts) => {
    if (err) {
      console.log("ERROR RETREIVING POSTS", err);
    } else {
      res.render("index", { posts: posts});
    }
  })
});

// NEW ROUTE -- Render form to create new blog post
router.get("/blogs/new", (req, res, next) => {
  res.render("new");
});

// CREATE ROUTE -- Handle 
router.post("/blogs", (req, res, next) => {
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
router.get("/blogs/:id", (req, res, next) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      console.log("ERROR DISPLAYING INDIVIDUAL POST IN SHOW ROUTE", err);
    } else {
      res.render("show", {post: post})
    }
  })
});


// EDIT ROUTE -- Render form to edit a specific post.
router.get("/blogs/:id/edit", (req, res, next) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      console.log("ERROR DISPLAYING EDIT FORM FOR THIS POST", err);
    } else {
      res.render("edit", {post: post});
    }
  });
});

// UPDATE ROUTE -- Handle Update to a specific post.
router.put("/blogs/:id", (req, res, next) => {
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Post.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedPost) => {
    updatedPost.modified = Date.now();
    if (err) {
      console.log("ERROR UPDATING BLOG POST", err);
    } else {
      res.redirect(`/blogs/${req.params.id}`);
    }
  });
});

// PREVIEW ROUTE -- Redirects Update form to a preview page, which is not yet saved to the DB. BUG: Data doesn't persist when user goes back to edit form. Perhaps move the Update button to this new page?
router.post("/blogs/:id/preview", (req, res, next) => {
  const id = req.params.id;
  res.render("preview", {post: req.body.blog, id: id});
});

// DELETE ROUTE -- Handle Delete Action for a specific post.
router.delete("/blogs/:id", (req, res, next) => {
  Post.findByIdAndDelete(req.params.id, (err, post) => {
    if (err) {
      console.log("ERROR DELETING POST", err);
    } else {
      res.redirect("/blogs");
    }
  })
})

module.exports = router;