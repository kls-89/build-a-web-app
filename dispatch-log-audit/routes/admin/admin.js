const express = require('express');
const router = express.Router();

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

router.post('/audits/:id', adminController.postEditAudit);


// AUTH

// Create New User Account -- render form
router.get("/add-user", adminController.getAddUser);
// Create new User account -- handle post request
router.post("/add-user", adminController.postAddUser);

module.exports = router;