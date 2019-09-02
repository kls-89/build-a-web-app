const express = require('express');
const router = express.Router();

const adminController = require('../../controllers/admin/admin');

router.get("/audits", adminController.getIndex);


// AUDITS
// NEW AUDIT
router.get("/audits/new", adminController.getNewAudit);
// CREATE AUDIT

// NEW AUDITS BULK
router.get('/audits/new/bulk', adminController.getNewBulkAudit)
// CREATE AUDITS BULK
router.post('/audits/new/bulk', adminController.postNewBulkAudit);

// Create New User Account
router.get("/add-user", adminController.getAddUser);

module.exports = router;