const bcrypt = require('bcryptjs');
const Employee = require('../../models/employee');

console.log('in the auth routes')

exports.getLogin = (req, res, next) => {
  console.log(req.loggedOut)
  let message = req.flash('error');

  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  res.render('auth/login', {
    pageTitle: 'Login',
    employeeName: null,
    isAuthenticated: false,
    isLoggedIn: false,
    isAdmin: false,
    errorMessage: message
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
        req.flash('error', 'Invalid email or password.');
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
                req.flash('success', 'Logged in as a Site Administrator.');
                return res.redirect('/admin/audits');
              } else {
                req.flash('success', 'Welcome Back,');
                return res.redirect('/')
              }


            });
          }
          // If passwords do not match
          req.flash('error', 'Invalid email or password');
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
    return res.set('loggedOut', true).redirect('/login')
  });
}