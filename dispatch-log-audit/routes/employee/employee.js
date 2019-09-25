const express = require('express');
const router = express.Router();

const employeeController = require('../../controllers/employee/employee');


router.get("/", employeeController.getIndex);
router.get("/audits", employeeController.getIndex);

// Sort by audits flagged for review.
router.get("/flagged-for-review", employeeController.getSortBy)


// SHOW
router.get("/audits/:id", employeeController.getShowAudit);

router.post("/audits/:id", employeeController.postShowAudit);

module.exports = router;