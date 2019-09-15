const bcrypt = require('bcryptjs');
const Employee = require('../../models/employee');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    pageTitle: 'Login',
    isAuthenticated: req.session.isLoggedIn
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
            return req.session.save(err => {
              if (err) {
                console.log(err);
              }
              res.redirect('/')
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

exports.getAddUser = (req, res, next) => {
  res.render('auth/add-user', {
    pageTitle: 'Add New User'
  });
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
        return res.redirect('/auth/add-user');
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
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
    })
}

exports.logout = (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  })
}