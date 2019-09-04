const bcrypt = require('bcryptjs');

const Calltaker = require('../../models/calltaker');

exports.getIndex = (req, res, next) => {
    res.render("admin/index", {
        pageTitle: "Admin Dashboard"
    });
}

exports.getNewCalltaker = (req, res, next) => {
    res.render("admin/calltaker/new", {
        pageTitle: "Create New Calltaker"
    });
}

exports.postNewCalltaker = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmedPassword = req.body.confirmedPassword;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    Calltaker
    .findOne({email: email})
    .then(checkCalltakerExists => {
        if (checkCalltakerExists) {
            // user already exists
            return res.redirect('/admin/calltakers/new');
        }
        // otherwise, hash the pw and create a new calltaker.
        return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
            const calltaker = Calltaker.create({
                email: email,
                password: hashedPassword,
                firstName: firstName,
                lastName: lastName
            });
        })
    })
    .then(result => {
        res.redirect("/admin");
    })
    .catch(err => {
        console.log(err);
    })
}