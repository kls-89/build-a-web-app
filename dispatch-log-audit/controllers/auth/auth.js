const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const transport = require('nodemailer-sendgrid-transport');
const Employee = require('../../models/employee');

const sendGrid = nodemailer.createTransport(transport({
  auth: {
    api_key: process.env.SENDGRID_API
  }
}))

exports.getLogin = (req, res, next) => {
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
                return res.redirect("/");
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

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    return res.redirect('/');
  });
};

exports.getReset = (req, res, next) => {
  let message = req.flash("msg");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  res.render('auth/reset', {
    pageTitle: 'Reset Password',
    employeeName: null,
    isAuthenticated: false,
    isLoggedIn: false,
    isAdmin: false,
    message: message
  })
}

exports.postReset = (req, res, next) => {
  const email = req.body.email;
  // Check if user account exists for provided email
  Employee.findOne({ email: email }, (err, employee) => {
    // If email not in DB, reload the page and prompt user.
    if (!employee) {
      req.flash("error", "The email address provided does not match our records.")
      return res.redirect("/reset");
    }
    // Email exists in DB
    // Generate reset token
    const token = crypto.randomBytes(32, (err, buffer) => {
      if (err) {
        console.log(err);
        return res.redirect('/reset');
      }
      const token = buffer.toString('hex');
    })
    // Token expires 1 hour from the time it's generated
    const tokenReset = Date.now() + 3600000;

    employee.token = token;
    employee.tokenReset = tokenReset;
    return employee.save();
  }).then(result => {
    req.flash("msg", "A password reset has been requested. Please check your e-mail for further instructions.");
    return res.redirect("back");
  })
}