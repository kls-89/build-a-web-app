require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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
  res.render("index");
});

// NEW ROUTE -- Render form to create new blog post
app.get("/blogs/new", (req, res, next) => {
  res.render("new");
});

// CREATE ROUTE -- Handle 
app.post("/blogs", (req, res, next) => {
  console.log(req.body)
  res.redirect("/blogs")
});

app.listen(3000, _ => console.log('blog app running'));