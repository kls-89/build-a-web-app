require('dotenv').config();

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const flash = require('connect-flash')
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const isAdmin = require('./middleware/isAdmin');
const errorController = require('./controllers/error/404');

const Employee = require('./models/employee');

const MONGODB_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PW}@webdev-cluster-kls-qduay.mongodb.net/BuildWebApp_DispatchLogAudit?retryWrites=true&w=majority`;


const app = express();
const store = new MongoDBStore({
	uri: MONGODB_URI,
	dbName: 'BuildWebApp_DispatchLogAudit',
	collection: 'sessions'
});

app.set('view engine', 'ejs');

// ROUTES
const adminRoutes = require('./routes/admin/admin');
const employeeRoutes = require('./routes/employee/employee');
const authRoutes = require('./routes/auth/auth');

// APPLICATION SETTINGS
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
	session({
		secret: 'brindle bugg',
		resave: false,
		saveUninitialized: false,
		store: store
	})
);

app.use(flash());

app.use((req, res, next) => {
	if (!req.session.employee) {
		return next();
	}
	Employee
		.findById(req.session.employee._id)
		.then(employee => {
			req.employee = employee;
			next();
		})
		.catch(err => console.log(err));
});

// THESE VALUES PASED TO EVERY RENDER CALL ON EVERY ROUTE
app.use((req, res, next) => {
	res.locals.isAuthenticated = req.session.isLoggedIn;
	next();
});

// ROUTE MIDDLEWARE
app.use('/admin', isAdmin, adminRoutes);
app.use(employeeRoutes);
app.use(authRoutes);

app.use(errorController.get404);

// DB CONNECTION
mongoose
	.connect(MONGODB_URI, { useNewUrlParser: true, dbName: 'BuildWebApp_DispatchLogAudit', useFindAndModify: false })
	.then(() => {
		console.log("SUCCESSFULLY CONNECTED TO MONGO DB ATLAS CLUSTER.")
		app.listen(3000, () => console.log("Server Running: Dispatch Log Audit"));
	})
	.catch(err => console.log("ERROR CONNECTING TO ATLAS CLUSTER", err));


