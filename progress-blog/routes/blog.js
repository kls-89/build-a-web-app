const express = require("express");

const router = express.Router();
const blogController = require("../controllers/blog");
const Post = require("../models/post");

// FORM SEARCH ROUTE
router.get('/search', blogController.handleSearchRequest);

// INDEX ROUTE
router.get("/", blogController.getIndex);

router.get("/blogs", blogController.getPosts);

// NEW ROUTE -- Render form to create new blog post
router.get("/blogs/new", blogController.getNewPostForm);

// CREATE ROUTE -- Handle 
router.post("/blogs", blogController.postCreateBlog);

// SHOW ROUTE -- Display individual post
router.get("/blogs/:id", blogController.getPost);


// EDIT ROUTE -- Render form to edit a specific post.
router.get("/blogs/:id/edit", blogController.getEditForm);

// UPDATE ROUTE -- Handle Update to a specific post.
router.put("/blogs/:id", blogController.updatePostHandler);

// PREVIEW ROUTE -- Redirects Update form to a preview page, which is not yet saved to the DB. BUG: Data doesn't persist when user goes back to edit form. Perhaps move the Update button to this new page?
router.post("/blogs/:id/preview", blogController.getPreviewForm);

// DELETE ROUTE -- Handle Delete Action for a specific post.
router.delete("/blogs/:id", blogController.handlePostDelete);

module.exports = router;