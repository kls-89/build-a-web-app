const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const transport = require('nodemailer-sendgrid-transport');

const { validationResult } = require('express-validator');

const Employee = require('../../models/employee');

const sendGrid = nodemailer.createTransport(transport({
  auth: {
    api_key: process.env.SENDGRID_API
  }
}))

exports.getLogin = (req, res, next) => {
  let message = req.flash('msg');

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
    message: message
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
        req.flash('msg', 'Invalid email or password.');
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
          req.flash('msg', 'Invalid email or password');
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

exports.getResetPassword = (req, res, next) => {
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

exports.postResetPassword = (req, res, next) => {
  let employeeName;
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect('/reset');
    }

    const token = buffer.toString("hex");

    Employee
      .findOne({ email: req.body.email })
      .then(employee => {
        if (!employee) {
          req.flash("msg", "The email address provided does not match our records.")
          return res.redirect("/reset");
        }
        employeeName = employee.firstName;
        employee.resetToken = token;
        // Token set to expire after 1 hour
        employee.resetTokenExpiration = Date.now() + 3600000;
        return employee.save();
      })
      .then(result => {
        // Updated Employee saved in DB. Now send email.
        req.flash("msg", "A password reset link has been sent to the email address you provided. Please follow those steps to continue.");
        return res.redirect("/");


      }).then(result => {
        sendGrid.sendMail({
          to: req.body.email,
          from: 'DoNotReply@AuditLog.com',
          subject: "Password Reset Requested",
          html: `
        <p>Hi ${employeeName}! We are in receipt of your password reset request. Please click <a href="http://localhost:3000/reset/${token}">this link</a> to set a new password.</p>
        <p>If you <strong>DID NOT</strong> make this request, then please disregard this e-mail.</p>
        <p><strong>Please note</strong>: This link will expire after 1 hour.</p>
        `
        })
      })
      .catch(err => console.log(err));
  });
}

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  Employee
    .findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then(employee => {
      let message = req.flash('msg');
      if (message.length > 0) {
        message = message[0];
      } else {
        message = null;
      }
      res.render('auth/new-password', {
        pageTitle: "Create a New Password",
        message: message,
        employeeId: employee._id.toString(),
        passwordToken: token,
        isAdmin: false,
        isLoggedIn: false
      })
    })
    .catch(err => console.log(err));
}

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const employeeId = req.body.employeeId;
  const passwordToken = req.body.passwordToken;
  let resetEmployee;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() }
    );
  }

  Employee.findOne({
    _id: employeeId,
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now() }
  })
    .then(employee => {
      resetEmployee = employee;
      return bcrypt.hash(newPassword, 12)
    })
    .then(hashedPassword => {
      resetEmployee.password = hashedPassword;
      resetEmployee.resetToken = undefined;
      resetEmployee.resetTokenExpiration = undefined;
      return resetEmployee.save();
    })
    .then(result => {
      req.flash("msg", "Your password has successfully been updated. Please Login with your updated credentials.")
      return res.redirect('/login');
    })
    .catch(err => console.log(err));
}