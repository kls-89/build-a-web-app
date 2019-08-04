const Post = require("../models/post");

exports.getIndex = (req, res, next) => {
    res.redirect("/blogs")
  };

exports.getPosts =  (req, res, next) => {
    Post.find({}, (err, posts) => {
      if (err) {
        console.log("ERROR RETREIVING POSTS", err);
      } else {
        res.render("index", { posts: posts});
      }
    })
  };

exports.getNewPostForm = (req, res, next) => {
    res.render("new");
  };

  exports.postCreateBlog = (req, res, next) => {
    req.body.blog.body = req.sanitize(req.body.blog.body)
    Post.create(req.body.blog, (err, post) => {
      if (err) {
        console.log("ERROR ADDING POST TO DB", err);
      } else {
        console.log(post);
        res.redirect("/blogs");
      }
    });
  
  }

  exports.getPost = (req, res, next) => {
    Post.findById(req.params.id, (err, post) => {
      if (err) {
        console.log("ERROR DISPLAYING INDIVIDUAL POST IN SHOW ROUTE", err);
      } else {
        res.render("show", {post: post})
      }
    })
  }

  exports.getEditForm = (req, res, next) => {
    Post.findById(req.params.id, (err, post) => {
      if (err) {
        console.log("ERROR DISPLAYING EDIT FORM FOR THIS POST", err);
      } else {
        res.render("edit", {post: post});
      }
    });
  };

  exports.updatePostHandler = (req, res, next) => {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Post.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedPost) => {
      updatedPost.modified = Date.now();
      if (err) {
        console.log("ERROR UPDATING BLOG POST", err);
      } else {
        res.redirect(`/blogs/${req.params.id}`);
      }
    });
  };

  exports.getPreviewForm = (req, res, next) => {
    const id = req.params.id;
    res.render("preview", {post: req.body.blog, id: id});
  }

  exports.handlePostDelete = (req, res, next) => {
    Post.findByIdAndDelete(req.params.id, (err, post) => {
      if (err) {
        console.log("ERROR DELETING POST", err);
      } else {
        res.redirect("/blogs");
      }
    })
  };