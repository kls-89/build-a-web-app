require('dotenv').config();

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();


// ROUTES
const employeeRoutes = require('./routes/employee/employee');
const adminRoutes = require('./routes/admin/admin');
const errorRoutes = require('./routes/error/404');

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/admin', adminRoutes);
app.use(employeeRoutes);

app.use(errorRoutes);

// DB CONNECTION
const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PW}@webdev-cluster-kls-qduay.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(connectionString, { useNewUrlParser: true, dbName: 'BuildWebApp_DispatchLogAudit', useFindAndModify: false })
	.then(() => {
		console.log("SUCCESSFULLY CONNECTED TO MONGO DB ATLAS CLUSTER.")
		app.listen(3000, () => console.log("Server Running: Dispatch Log Audit"));

	})
	.catch(err => console.log("ERROR CONNECTING TO ATLAS CLUSTER", err));