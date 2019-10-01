const express = require('express');
const router = express.Router();

const { body, check } = require('express-validator');

const adminController = require('../../controllers/admin/admin');

router.get("/audits", adminController.getIndex);


// AUDITS
// NEW AUDIT
router.get("/audits/new", adminController.getNewAudit);
// CREATE AUDIT
router.post("/audits", adminController.postNewAudit);

// SHOW AUDIT
router.get("/audits/:id", adminController.getShowAudit);



// NEW AUDITS BULK
router.get('/audits/new/bulk', adminController.getNewBulkAudit)

// CREATE AUDITS BULK
// Generates random call numbers
router.post('/audits/new/bulk', adminController.postNewBulkAudit);

router.post('/audits/new/bulk-generate-audits', adminController.postGenerateRandomAudits);

// EDIT/UPDATE AUDIT
router.get('/audits/:id/edit', adminController.getEditAudit);
router.put('/audits/:id', adminController.putEditAudit);


// DELETE AUDIT
router.delete('/audits/:id', adminController.deleteEditAudit)


// MISC UTILITY ROUTES

// Manage Employees
// Render Index
router.get("/employees", adminController.getEmployeesIndex);

// Create New User Account -- render form
router.get("/employees/new", adminController.getAddUser);

// Create new User account -- handle post request
router.post("/employees", [
  // validate email
  check('email').isEmail(),
  // pw must be at least 5 chars
  check('password').isLength({ min: 5 }),
  // PW and Confirm PW match
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    // successful synchronous custom validator
    return true;
  })
], adminController.postAddUser);


// Notify Employee of Audits form 
router.get("/employees/:id/notify", adminController.getNotifyEmployee);
router.post("/employees/:id/notify", adminController.postNotifyEmployee);
// SHOW Employee
router.get("/employees/:id", adminController.getShowEmployee);


// Search DB for specific Audit Criteria.
router.get("/sort-by", adminController.getSortBy)

router.get("/sort-by-employee", adminController.getSortByEmployee)

module.exports = router;