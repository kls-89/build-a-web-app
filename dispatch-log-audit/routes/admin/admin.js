const express = require('express');
const router = express.Router();

const adminController = require('../../controllers/admin/admin');

router.get("/", adminController.getIndex);
router.post("/", adminController.postIndex);

module.exports = router;