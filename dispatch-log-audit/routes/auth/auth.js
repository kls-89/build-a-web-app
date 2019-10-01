const express = require('express');
const router = express.Router();

const { body, check } = require("express-validator");

const authController = require('../../controllers/auth/auth');

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

router.get('/reset', authController.getResetPassword);
router.post('/reset', authController.postResetPassword);

router.get('/reset/:token', authController.getNewPassword);
router.post('/new-password', [
  check('password').isLength({ min: 5 }),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match. Please try again.');
    }
    return true
  })
], authController.postNewPassword);

router.post('/logout', authController.postLogout);




module.exports = router;