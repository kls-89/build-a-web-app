const express = require('express');
const router = express.Router();

const authController = require('../../controllers/auth/auth');

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

router.get('/reset', authController.getResetPassword);
router.post('/reset', authController.postResetPassword);

router.get('/reset/:token', authController.getNewPassword);
router.post('/new-password', authController.postNewPassword);

router.post('/logout', authController.postLogout);




module.exports = router;