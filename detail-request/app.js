const express = require('express');

const detailRoutes = require("./routes/detail");
const app = express();
app.set("view engine", "ejs");

app.use(detailRoutes);

app.listen(3000, () => console.log("Server Running"));