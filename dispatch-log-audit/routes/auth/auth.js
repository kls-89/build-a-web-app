const express = require('express');
const router = express.Router();

const authController = require('../../controllers/auth/auth');

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

router.get('/logout', authController.logout);

// Create New User Account -- render form
router.get("/add-user", authController.getAddUser);
// Create new User account -- handle post request
router.post("/add-user", authController.postAddUser);


module.exports = router;