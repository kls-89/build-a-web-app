const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: String,
  body: String,
  tags: String,
  created: { type: Date, default: Date.now }
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;