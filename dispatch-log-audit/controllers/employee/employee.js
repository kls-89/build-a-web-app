const Audit = require('../../models/audit');
const Employee = require('../../models/employee');
exports.getIndex = (req, res, next) => {
    let message = req.flash('success');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    // Show Employee home page only if logged in; otherwise, redirect to login form.
    if (req.session.employee) {
        const id = req.session.employee._id;
        Audit.find({ employeeId: id })
            .then(audits => {
                return res.render("employee/index", {
                    pageTitle: "Employee Home",
                    employeeName: req.session.employee.firstName,
                    audits: audits,
                    isAdmin: req.session.isAdmin,
                    isLoggedIn: req.session.isLoggedIn,
                    message: message
                });
            })
            .catch(err => console.log(err));
    } else {
        return res.redirect('/login');
    }
}

// Render custom views to dashboard to allow user to sort.
exports.getSortBy = (req, res, next) => {
    const id = req.session.employee._id;
    Audit.find({ employeeId: id, flagForReview: true })
        .then(audits => {
            console.log(audits)
            res.render("employee/index", {
                pageTitle: "Audits Flagged for Review",
                audits: audits,
                employeeName: req.session.employee.firstName,
                isAdmin: req.session.isAdmin,
                isLoggedIn: req.session.isLoggedIn,
                message: null
            })
        })
        .catch(err => console.log(err));

}







exports.getShowAudit = (req, res, next) => {
    const id = req.params.id;
    Audit
        .findById(id)
        .then(audit => {
            res.render('employee/show-audit', {
                pageTitle: "Audit",
                audit: audit,
                isAdmin: req.session.isAdmin,
                isLoggedIn: req.session.isLoggedIn,
                employeeName: req.session.employee.firstName
            })
        })
        .catch(err => console.log(err));
}