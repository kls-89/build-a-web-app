const bcrypt = require('bcryptjs');
const Employee = require('../../models/employee');

exports.getLogin = (req, res, next) => {

  res.render('auth/login', {
    pageTitle: 'Login',
    employeeName: null,
    isAuthenticated: false,
    isLoggedIn: false,
    isAdmin: false
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  Employee
    .findOne({ email: email })
    .then(employee => {
      if (!employee) {
        // If user isn't found in DB
        return res.redirect('/login')
      }
      // Email exists at this point. Now validate pw.
      bcrypt.compare(password, employee.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.employee = employee;
            req.session.isAdmin = employee.isAdmin;

            return req.session.save(err => {
              if (err) {
                console.log(err);
              }

              if (req.session.isAdmin) {
                return res.redirect('/admin/audits');
              } else {
                return res.redirect('/')
              }


            });
          }
          // If passwords do not match
          res.redirect('/login')
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        })
    })
    .catch(err => console.log(err));
}

exports.logout = (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  })
}