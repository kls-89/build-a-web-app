const express = require('express');
const router = express.Router();

const authController = require('../../controllers/auth/auth');

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

router.get('/reset', authController.getReset);
router.post('/reset', authController.postReset);

router.post('/logout', authController.postLogout);




module.exports = router;