const express = require('express');
const app = express();

const employeeRoutes = require('./routes/employee/employee');
const adminRoutes = require('./routes/admin/admin');
const errorRoutes = require('./routes/error/404');
app.set('view engine', 'ejs');

app.use('/admin', adminRoutes);
app.use(employeeRoutes);

app.use(errorRoutes);

app.listen(3000, () => {
    console.log('Server running.');
});