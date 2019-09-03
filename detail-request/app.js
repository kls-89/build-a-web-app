require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

// IMPORT ROUTES
const detailRoutes = require("./routes/detail");
const adminRoutes = require('./routes/admin/admin');
const app = express();

app.set("view engine", "ejs");

// MIDDLEWARE
app.use('/admin', adminRoutes);
app.use(detailRoutes);

// DB CONNECTION
const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PW}@webdev-cluster-kls-qduay.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(connectionString, { useNewUrlParser: true, dbName: "BuildWebApp_DetailRequest", useFindAndModify: false })
  .then(() => {
      console.log("SUCCESSFULLY CONNECTED TO MONGO DB ATLAS CLUSTER.")
      app.listen(3000, () => console.log("Server Running"));

    })
  .catch(err => console.log("ERROR CONNECTING TO ATLAS CLUSTER", err));
