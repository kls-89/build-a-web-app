const bcrypt = require('bcryptjs');
const moment = require('moment');
const currentYear = moment().format('YY');

const Employee = require('../../models/employee');
const Audit = require('../../models/audit');

exports.getIndex = (req, res, next) => {
    Audit
        .find({})
        .then(audits => {
            res.render("admin/index", {
                pageTitle: "Admin Index",
                audits: audits
            })
        })
        .catch(err => console.log(err));
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

exports.postNewAudit = (req, res, next) => {
    const callNumber = `${req.body.currentYear}-${req.body.callNumber}`;
    const employeeId = req.body.calltakerName;
    const callDate = req.body.callDate;
    const callReason = req.body.callReason;
    const callLocation = req.body.callLocation;
    const callAction = req.body.callAction;
    const criticalErrors = req.body.criticalErrors;
    const flagForReview = req.body.flagForReview;
    const auditorComments = req.body.auditorComments;
    const auditInProgress = req.body.auditInProgress;

    Employee
        .findById(employeeId)
        .then(employee => {
            console.log(employee);
            const calltakerName = `${employee.firstName} ${employee.lastName}`;
            return Audit.create({
                callNumber: callNumber,
                calltakerName: calltakerName,
                callDate: callDate,
                callReason: callReason,
                callLocation: callLocation,
                callAction: callAction,
                criticalErrors: criticalErrors,
                flagForReview: flagForReview,
                auditorComments: auditorComments,
                auditInProgress: auditInProgress,
                employeeId: employee._id
            }).then(audit => {
                employee.auditHistory.push(audit._id);
                employee.save();
                return res.redirect("/admin/audits/new");
            })
        })
        .catch(err => console.log(err))



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

exports.postGenerateRandomAudits = (req, res, next) => {
    const listOfRandomCallNumbers = req.body.listOfRandomCallNumbers;
    let arrOfRandomCalls = listOfRandomCallNumbers.split(',');

    // Strip whitespace from each call number
    let arrOfRandomCallsToSubmit = arrOfRandomCalls.map(callNumber => {
        return callNumber.trim();
    });

    // Create audits for each call number:

    for (let i = 0; i < arrOfRandomCallsToSubmit.length; i++) {
        Audit
            .create({
                callNumber: arrOfRandomCallsToSubmit[i],
                calltakerName: "ENTER CALLTAKER NAME",
                callDate: true,
                callReason: true,
                callLocation: true,
                callAction: true,
                criticalErrors: false,
                flagForReview: false,
                auditorComments: "ENTER COMMENTS HERE",
                // employeeId: employee._id
            })
            .then(audits => {
                console.log("BULK AUDITS CREATED")
                res.redirect("/admin/audits");
            })
            .catch(err => console.log(err));
    }

};

exports.getShowAudit = (req, res, next) => {
    const id = req.params.id;
    Audit
        .findById(id)
        .then(audit => {
            res.render('admin/show-audit', {
                pageTitle: "Audit",
                audit: audit
            })
        })
        .catch(err => console.log(err));
}


exports.getEditAudit = (req, res, next) => {

    Employee.find({})
        .then(employees => {
            const id = req.params.id;
            Audit
                .findById(id)
                .then(audit => {
                    res.render('admin/edit-audit', {
                        pageTitle: "Edit Audit",
                        audit: audit,
                        employees: employees,
                        currentYear: currentYear
                    })
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err));
}


// AUTH
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