const bcrypt = require('bcryptjs');
const moment = require('moment');
const mongoose = require('mongoose');
const currentYear = moment().format('YY');

const Employee = require('../../models/employee');
const Audit = require('../../models/audit');

exports.getIndex = (req, res, next) => {
    Audit
        .find({})
        .then(audits => {
            res.render("admin/index", {
                pageTitle: "Admin Index",
                audits: audits,
                employeeName: req.session.employee.firstName,
                isAdmin: req.session.isAdmin,
                isLoggedIn: req.session.isLoggedIn
            })
        })
        .catch(err => console.log(err));
}

exports.getNewAudit = (req, res, next) => {
    Employee.find({})
        .then(employees => {
            res.render('admin/new-audit', {
                pageTitle: 'Create New Audit',
                employeeName: req.session.employee.firstName,
                currentYear: currentYear,
                employees: employees,
                isAdmin: req.session.isAdmin,
                isLoggedIn: req.session.isLoggedIn
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
        employeeName: req.session.employee.firstName,
        submittedValues: false,
        isAdmin: req.session.isAdmin,
        isLoggedIn: req.session.isLoggedIn
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
        employeeName: req.session.employee.firstName,
        currentYear: currentYear,
        isAdmin: req.session.isAdmin,
        isLoggedIn: req.session.isLoggedIn
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
                employeeId: null
            })
            .then(audits => {
                console.log("BULK AUDITS CREATED")
            })
            .catch(err => console.log(err));
    }
    return res.redirect("/admin/audits");
};

exports.getShowAudit = (req, res, next) => {
    const id = req.params.id;
    Audit
        .findById(id)
        .then(audit => {
            res.render('admin/show-audit', {
                pageTitle: "Audit",
                audit: audit,
                employeeName: req.session.employee.firstName,
                isAdmin: req.session.isAdmin,
                isLoggedIn: req.session.isLoggedIn
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
                        employeeName: req.session.employee.firstName,
                        employees: employees,
                        currentYear: currentYear,
                        isAdmin: req.session.isAdmin,
                        isLoggedIn: req.session.isLoggedIn
                    })
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err));
}

exports.putEditAudit = (req, res, next) => {
    // EDIT
    const auditId = new mongoose.Types.ObjectId(req.params.id);

    const updatedCallNumber = `${req.body.currentYear}-${req.body.callNumber}`;
    const updatedCallDate = req.body.callDate;
    const updatedCallReason = req.body.callReason;
    const updatedCallLocation = req.body.callLocation;
    const updatedCallAction = req.body.callAction;
    const updatedCriticalErrors = req.body.criticalErrors;
    const updatedFlagForReview = req.body.flagForReview || '0';
    const updatedAuditorComments = req.body.auditorComments;
    const updatedAuditInProgress = req.body.auditInProgress;

    const updatedAudit = {
        callNumber: updatedCallNumber,
        callDate: updatedCallDate,
        callReason: updatedCallReason,
        callLocation: updatedCallLocation,
        callAction: updatedCallAction,
        criticalErrors: updatedCriticalErrors,
        flagForReview: updatedFlagForReview,
        auditorComments: updatedAuditorComments,
        auditInProgress: updatedAuditInProgress
    };

    // If user leaves calltaker name select menu blank.
    if (!req.body.calltakerName) {
        console.log("NEED TO INPUT CALLTAKER NAME")
        return res.redirect("back");
    }
    // Otherwise, assign this value to employeeId
    const employeeId = new mongoose.Types.ObjectId(req.body.calltakerName);

    Employee
        .findById(employeeId)
        .then(employee => {
            // Add in Calltaker Name & Employee ID to the edited audit:
            updatedAudit.calltakerName = `${employee.firstName} ${employee.lastName}`;
            updatedAudit.employeeId = new mongoose.Types.ObjectId(employee._id);

            // Push Audit number into Employee's audit hx if not already there.
            if (!employee.auditHistory.includes(auditId)) {
                employee.auditHistory.push(auditId);
            };

            employee.save();

            return Audit.findByIdAndUpdate(auditId, updatedAudit, (err, document) => {
                if (err) {
                    console.log(err);
                }
            })
        })
        .catch(err => console.log(err));

    // Grab original audit employee id if it exists.
    let originalAuditEmployeeId;
    if (req.body.originalAuditEmployeeId) {
        originalAuditEmployeeId = new mongoose.Types.ObjectId(req.body.originalAuditEmployeeId);
    }

    // Remove audit ID from original employee record. This is to prevent the same audit belonging to 2 different users.
    if (originalAuditEmployeeId) {
        Employee
            .findById(originalAuditEmployeeId)
            .then(employee => {
                let index = employee.auditHistory.indexOf(auditId);
                if (index > -1) {
                    employee.auditHistory.splice(index, 1);
                    employee.save();
                }
            })
            .catch(err => console.log(err));
    }

    return res.redirect(`/admin/audits/${auditId}`);

}

exports.deleteEditAudit = (req, res, next) => {
    const id = req.params.id;
    res.redirect('/admin/audits');
}


exports.getAddUser = (req, res, next) => {
    res.render('admin/add-user', {
        pageTitle: 'Add New User',
        isAdmin: req.session.isAdmin,
        employeeName: req.session.employee.firstName,
        isLoggedIn: req.session.isLoggedIn
    });
}

exports.postAddUser = (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const isAdmin = req.body.isAdmin;

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
                        lastName: lastName,
                        isAdmin: isAdmin
                    });
                })
        })
        .then(result => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        })
}