const express = require('express');
const router = express.Router();

const adminController = require('../../controllers/admin/admin');

router.get("/", adminController.getIndex);
router.post("/", adminController.postIndex);

// Create New User Account
router.get("/add-user", adminController.getAddUser);

module.exports = router;