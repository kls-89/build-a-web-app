const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// INDEX ROUTE
app.get("/", (req, res, next) => {
  res.redirect("/blogs")
});

app.get("/blogs", (req, res, next) => {
  res.render("index");
});

app.listen(3000, _ => console.log('blog app running'));