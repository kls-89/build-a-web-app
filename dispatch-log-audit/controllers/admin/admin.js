const nodemailer = require('nodemailer');
const transport = require('nodemailer-sendgrid-transport');
const webAppURL = 'http://localhost:3000'
const sendGrid = nodemailer.createTransport(transport({
    auth: {
        api_key: process.env.SENDGRID_API
    }
}))

const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const moment = require('moment');
const mongoose = require('mongoose');
const currentYear = moment().format('YY');

const Employee = require('../../models/employee');
const Audit = require('../../models/audit');

exports.getIndex = (req, res, next) => {

    let message = req.flash('success');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    Employee
        .find({})
        .then(employees => {
            Audit
                .find({})
                .then(audits => {
                    res.render("admin/index", {
                        pageTitle: "Admin Index",
                        audits: audits,
                        employeeName: req.session.employee.firstName,
                        isAdmin: req.session.isAdmin,
                        isLoggedIn: req.session.isLoggedIn,
                        message: message,
                        employees: employees || null
                    })
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err))
}


// Render custom views to dashboard to allow user to sort.
exports.getSortBy = (req, res, next) => {
    const searchTerm = req.query.sortBy;
    let mongoFind = {};
    switch (searchTerm) {
        case 'flagForReview':
            mongoFind.flagForReview = true;
            break;
        case 'auditStatusOpen':
            mongoFind.auditStatus = 'OPEN';
            break;
        case 'auditStatusClosed':
            mongoFind.auditStatus = 'CLOSED';
            break;
        case 'unassigned':
            mongoFind.employeeId = null;
            break;
        case 'criticalErrors':
            mongoFind.criticalErrors = true;
            break;
        case 'showAllAudits':
            break;
    }
    Employee.find({})
        .then(employees => {
            Audit.find(mongoFind)
                .then(audits => {
                    res.render("admin/index", {
                        pageTitle: "Admin Index | Sort",
                        audits: audits,
                        employeeName: req.session.employee.firstName,
                        isAdmin: req.session.isAdmin,
                        isLoggedIn: req.session.isLoggedIn,
                        message: null,
                        employees: employees
                    })
                })
                .catch(err => console.log(err));
        }).catch(err => console.log(err))

}

// SORT AUDITS BY EMPLOYEE
exports.getSortByEmployee = (req, res, next) => {
    const searchTerm = new mongoose.Types.ObjectId(req.query.sortByEmployee);
    Employee
        .find({})
        .then(employees => {
            Audit.find({ employeeId: searchTerm })
                .then(audits => {
                    return res.render("admin/index", {
                        pageTitle: "Employee View",
                        employeeName: req.session.employee.firstName,
                        audits: audits,
                        isAdmin: req.session.isAdmin,
                        isLoggedIn: req.session.isLoggedIn,
                        message: null,
                        employees: employees
                    })
                })
                .catch(err => console.log(err));
        }).catch(err => console.log(err))
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
                return res.redirect("/admin/audits");
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
    let updatedAuditInProgress = req.body.auditInProgress || 1;
    let updatedAuditStatus;

    if (updatedAuditInProgress == 0) {
        updatedAuditStatus = "CLOSED";
    } else {
        updatedAuditStatus = "OPEN";
    }

    const updatedAudit = {
        callNumber: updatedCallNumber,
        callDate: updatedCallDate,
        callReason: updatedCallReason,
        callLocation: updatedCallLocation,
        callAction: updatedCallAction,
        criticalErrors: updatedCriticalErrors,
        flagForReview: updatedFlagForReview,
        auditorComments: updatedAuditorComments,
        auditInProgress: updatedAuditInProgress,
        auditStatus: updatedAuditStatus
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
                console.log('line 274')
                console.log(document);
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
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }

    res.render('admin/employees/new', {
        pageTitle: 'Add New User',
        isAdmin: req.session.isAdmin,
        employeeName: req.session.employee.firstName,
        isLoggedIn: req.session.isLoggedIn,
        message: message
    });
}

exports.postAddUser = (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const isAdmin = req.body.isAdmin;

    if (password !== confirmPassword) {
        // Password validation -- plaintext??
        req.flash('error', "Passwords do not match. Please try again.");
        return res.redirect('/admin/add-user');
    }

    Employee
        .findOne({ email: email })
        .then(checkEmployeeExists => {
            if (checkEmployeeExists) {
                // User Account exists
                req.flash('error', "Email address already exists.");
                return res.redirect('/admin/add-user');
            }
            // else hash pw and create new user
            return bcrypt
                .hash(password, 12)
                .then(hashedPassword => {
                    return Employee.create({
                        email: email,
                        password: hashedPassword,
                        firstName: firstName,
                        lastName: lastName,
                        isAdmin: isAdmin
                    });
                }).then(newEmployee => {
                    // Send email to new user
                    const email = {
                        to: newEmployee.email,
                        from: 'doNotReply@AuditLog.com',
                        subject: `User Account Created | ${newEmployee.firstName} ${newEmployee.lastName}`,
                        html: `
                        <h1>Welcome, ${newEmployee.firstName}!</h1>
                        <p>A new AuditLog account has been created for ${newEmployee.firstName} ${newEmployee.lastName}.</p>
                        <p><strong>Please Note</strong>: This was not done by you; rather, your Agency's Administrator took this action.</p>
                        <p>The dispatch log must be audited to ensure that records are accurate and complete. AuditLog is a platform that allows for an Agency Administrator to document log audits and to share these audits with each employee.</p>

                        <p><strong>Access Level</strong>: You have been given ${newEmployee.isAdmin ? "<strong>Site Administrator</strong> access. You are authorized to view all audits, create new audits, edit existing audits, or delete them. You are also authorized to create and maintain user accounts." : "<strong>Employee</strong> access. You are authorized to view your own audits and communicate with the auditor about particular reports."}</p>
                        <p><a href="${webAppURL}">Click this link to login to the site</a>. You will need to contact your Agency Administrator for your password.</p>
                        `};

                    sendGrid.sendMail(email, (err, res) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log(res);
                    })
                    console.log("USER ADDED", newEmployee);
                }).catch(err => console.log(err))
        })
        .then(result => {
            res.redirect('/admin/audits');
        })
        .catch(err => {
            console.log(err);
        })
}

// EMPLOYEE MANAGEMENT

exports.getEmployeesIndex = (req, res, next) => {
    let message = req.flash("msg");
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }

    Employee
        .find({})
        .collation({
            locale: 'en',
            strength: 1
        })
        .sort({ lastName: 1 })
        .then(employees => {
            res.render("admin/employees/index", {
                pageTitle: "Manage Employees",
                isAdmin: req.session.isAdmin,
                employeeName: req.session.employee.firstName,
                isLoggedIn: req.session.isLoggedIn,
                message: message,
                employees: employees
            });
        })
        .catch(err => console.log(err));

}

exports.getShowEmployee = (req, res, next) => {
    const id = req.params.id;
    let message = req.flash("msg");
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    Employee
        .findById(id)
        .then(employee => {

            Audit
                .find({ employeeId: id })
                .then(audits => {
                    audits = audits;
                    return audits
                }).then(audits => {
                    // Meet these conditions:
                    // audit.flagForReview && !audit.employeeReviewedAudit
                    let auditFlagged = false;
                    let employeeReviewed = false;

                    let auditFlaggedCount = 0;
                    let employeeReviewedCount = 0;
                    let auditFlaggedNotReviewedCount = 0;

                    let auditsFlaggedNotReviewedArray = [];

                    audits.forEach(audit => {

                        if (audit.flagForReview) {
                            auditFlagged = true;
                            auditFlaggedCount++;
                        }
                        if (audit.employeeReviewedAudit) {
                            employeeReviewed = true;
                            employeeReviewedCount++;
                        }
                        if (audit.flagForReview && !audit.employeeReviewedAudit) {
                            auditFlaggedNotReviewedCount++;
                            auditsFlaggedNotReviewedArray.push(audit.callNumber);
                        }
                    });

                    return res.render("admin/employees/show", {
                        pageTitle: `${employee.firstName} ${employee.lastName}`,
                        isAdmin: req.session.isAdmin,
                        employeeName: req.session.employee.firstName,
                        isLoggedIn: req.session.isLoggedIn,
                        message: message,
                        employee: employee,
                        audits: audits,
                        auditFlagged: auditFlagged,
                        employeeReviewed: employeeReviewed,
                        auditFlaggedNotReviewedCount: auditFlaggedNotReviewedCount,
                        auditsFlaggedNotReviewedArray: auditsFlaggedNotReviewedArray
                    })
                })

        }).catch(err => console.log(err));
}

exports.getNotifyEmployee = (req, res, next) => {
    const employeeId = req.params.id;
    let message = req.flash('msg');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    Employee
        .findById(employeeId)
        .then(employee => {
            Audit.find({ employeeId: employeeId })
                .then(audits => {
                    let auditFlaggedNotReviewedCount = 0;
                    audits.forEach(audit => {
                        if (audit.flagForReview && !audit.employeeReviewedAudit) {
                            auditFlaggedNotReviewedCount++;
                        }
                    })
                    let pendingAuditNotificationMessage = `Hello ${employee.firstName}, You have ${auditFlaggedNotReviewedCount} ${auditFlaggedNotReviewedCount > 1 ? "audits that need" : "audit that needs"} review. Please login to complete your review as soon as possible.`;

                    res.render('admin/employees/notify', {
                        pageTitle: `Notify ${employee.firstName} ${employee.lastName}`,
                        isAdmin: req.session.isAdmin,
                        employeeName: req.session.employee.firstName,
                        isLoggedIn: req.session.isLoggedIn,
                        employee: employee,
                        message: message,
                        pendingAuditNotificationMessage: pendingAuditNotificationMessage
                    })
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err));
}

exports.postNotifyEmployee = (req, res, next) => {
    const messageBody = req.body.pendingAuditNotificationMessage;
    const emailAddress = req.body.email;
    const employeeId = req.body.employeeId;

    // Generate a unique id and timestamp for the notification message. To be used as a way of preventing the administrator from sending duplicate notifications for the same audits.

    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err);
            return res.redirect("back");
        }
        const notificationMessageId = buffer.toString("hex");
        const notificationMessageSentDate = Date.now();
        Employee
            .findById(employeeId)
            .then(employee => {
                employee.notificationMessageId = notificationMessageId;
                employee.notificationMessageSentDate = notificationMessageSentDate;
                return employee.save();
            }).then(employee => {
                // Employee data updated.
                req.flash("msg", `An email was sent to ${employee.firstName} to advise of this review request.`)
                return res.redirect(`/admin/employees/${employee._id}`);
            }).then(result => {
                // Send email to employee

                const email = {
                    to: emailAddress,
                    from: 'doNotReply@AuditLog.com',
                    subject: 'Audit Review Requested',
                    html: `<p>${messageBody}</p>
        <p><a href="${webAppURL}">Click this link to login to the site</a>. You can see which audits are flagged for review by clicking the "View Audits Flagged for Review" button after you login.</p><p>Audits requiring that action be taken on your part will display <strong>Employee Review Needed</strong>.</p>`
                };
                sendGrid.sendMail(email, (err, res) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(res);
                })
            })
            .catch(err => console.log(err));
    });
}