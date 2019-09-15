const express = require('express');
const router = express.Router();

const employeeController = require('../../controllers/employee/employee');


router.get("/", employeeController.getIndex);

// SHOW
router.get("/audits/:id", employeeController.getShowAudit);


module.exports = router;