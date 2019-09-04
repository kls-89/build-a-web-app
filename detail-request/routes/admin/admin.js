const express = require('express');
const router = express.Router();

const adminController = require('../../controllers/admin/admin');
// Config Application

// ADMIN DASHBOARD
router.get('/', adminController.getIndex);

// CALLTAKERS
router.get('/calltakers/new', adminController.getNewCalltaker);

router.post('/calltakers', adminController.postNewCalltaker);

// OFFICERS

module.exports = router;