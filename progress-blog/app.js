require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressSanitizer = require('express-sanitizer');

// MODELS
const Post = require("./models/post");

// ROUTES
const blogRoutes = require("./routes/blog");

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

app.use(blogRoutes);

app.listen(3000, _ => console.log('blog app running'));