const bcrypt = require('bcryptjs');
const moment = require('moment');
const currentYear = moment().format('YY');

const Employee = require('../../models/employee');

exports.getIndex = (req, res, next) => {
    res.render("admin/index", {
        pageTitle: "Admin Index"
    })
}

exports.getNewAudit = (req, res, next) => {
    Employee.find({})
        .then(employees => {
            res.render('admin/new-audit', {
                pageTitle: 'Create New Audit',
                currentYear: currentYear,
                employees: employees
            })
        })
}
exports.getNewBulkAudit = (req, res, next) => {
    res.render("admin/new-bulk-audit", {
        pageTitle: "Administrator | Bulk Add ",
        currentYear: currentYear,
        submittedValues: false
    });
}

exports.postNewBulkAudit = (req, res, next) => {
    const starting = Number(req.body.starting);
    const ending = Number(req.body.ending);
    const totalCalls = Math.abs(ending - starting) + 1;
    const percentageOfCalls = Number(req.body.percentage) / 100;
    const numberOfCallsToAudit = Math.ceil(totalCalls * percentageOfCalls);

    let randomCallNumbers = [];

    while (randomCallNumbers.length <= numberOfCallsToAudit) {
        let min = Math.ceil(starting);
        let max = Math.floor(ending);
        let randomCall = Math.floor(Math.random() * (max - min + 1)) + min;

        // Only add non-duplicate numbers to final list 
        if (!randomCallNumbers.includes(randomCall)) {
            randomCallNumbers.push(randomCall);
        }
        // Break out of loop once while condition is met
        if (randomCallNumbers.length === numberOfCallsToAudit) {
            break;
        }
    }

    const listOfRandomCallNumbers = randomCallNumbers.map(callNumber => {
        return ` ${currentYear}-${String(callNumber)}`;
    });

    res.render('admin/new-bulk-audit', {
        starting: starting,
        ending: ending,
        totalCalls: totalCalls,
        percentageOfCalls: percentageOfCalls,
        numberOfCallsToAudit: numberOfCallsToAudit,
        listOfRandomCallNumbers: listOfRandomCallNumbers,
        submittedValues: true,
        pageTitle: "Administrator | Bulk Add Audits",
        currentYear: currentYear,
    });
}

exports.getAddUser = (req, res, next) => {
    res.render('admin/add-user', {
        pageTitle: 'Add New User'
    })
}

exports.postAddUser = (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    Employee
        .findOne({ email: email })
        .then(checkEmployeeExists => {
            if (checkEmployeeExists) {
                // User Account exists
                return res.redirect('/admin/add-user');
            }
            // else hash pw and create new user
            return bcrypt
                .hash(password, 12)
                .then(hashedPassword => {
                    const employee = Employee.create({
                        email: email,
                        password: hashedPassword,
                        firstName: firstName,
                        lastName: lastName
                    });
                })
        })
        .then(result => {
            res.redirect('/admin/audits');
        })
        .catch(err => {
            console.log(err);
        })
}