const Audit = require('../../models/audit');
const Employee = require('../../models/employee');
exports.getIndex = (req, res, next) => {
    // Show Employee home page only if logged in; otherwise, redirect to login form.
    if (req.session.employee) {
        const id = req.session.employee._id;
        Audit.find({ employeeId: id })
            .then(audits => {
                return res.render("employee/index", {
                    pageTitle: "Employee Home",
                    employeeName: req.session.employee.firstName,
                    audits: audits
                });
            })
            .catch(err => console.log(err));
    } else {
        return res.redirect('/login');
    }
}

exports.getShowAudit = (req, res, next) => {
    const id = req.params.id;
    Audit
        .findById(id)
        .then(audit => {
            res.render('employee/show-audit', {
                pageTitle: "Audit",
                audit: audit
            })
        })
        .catch(err => console.log(err));
}