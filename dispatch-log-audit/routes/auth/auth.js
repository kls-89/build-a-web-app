const express = require('express');
const router = express.Router();

const authController = require('../../controllers/auth/auth');

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

router.get('/logout', authController.logout);



module.exports = router;